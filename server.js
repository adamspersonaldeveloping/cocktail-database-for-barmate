const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'drinks-api'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('drinks-api').find().sort({likes: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})
//trying to set up console.log for data from api
app.get('/displayInfo', async (request, response)=>{
    db.collection('drinks-api').find().toArray()
    .then(data => {
        console.log(data)
        response.json(data)
    })
    //console.log(request.body)
    //const infoToDisplay = await db.collection('drinks-api').find().toArray()
    //console.log(infoToDisplay)
    .catch(error => console.error(error))
})

app.post('/addCocktail', (request, response) => {
    db.collection('drinks-api').insertOne({name: request.body.name,
    ingredients: {ingredient1: request.body.ingredient1, ingredient2: request.body.ingredient2, ingredient3: request.body.ingredient3, ingredient4: request.body.ingredient4, ingredient5: request.body.ingredient5, ingredient6: request.body.ingredient6, ingredient7: request.body.ingredient7, ingredient8: request.body.ingredient8, ingredient9: request.body.ingredient9, ingredient10: request.body.ingredient10}, measurements: {measurement1: request.body.measurement1,measurement2: request.body.measurement2, measurement3: request.body.measurement3, measurement4: request.body.measurement4, measurement5: request.body.measurement5, measurement6: request.body.measurement6, measurement7: request.body.measurement7, measurement8: request.body.measurement8, measurement9: request.body.measurement9, measurement10: request.body.measurement10}, garnish: request.body.garnish, preperation: request.body.preperation, image: request.body.image, funFact: request.body.funFact, likes: 0})
    .then(result => {
        console.log('Cocktail Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('drinks-api').updateOne({name: request.body.nameS, likes: request.body.likesS},{
        $set: {
            likes:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteDrink', (request, response) => {
    db.collection('drinks-api').deleteOne({name: request.body.nameS})
    .then(result => {
        console.log('Drink Deleted')
        response.json('Drink Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})