const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')
const nameText = document.querySelectorAll('.drinkName')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteDrink)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})
Array.from(nameText).forEach((element)=>{
    element.addEventListener('click', displayInfo)
})


async function deleteDrink(){
    if(confirm('Are you sure you want to delete this entry?') == true){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteDrink', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameS': sName,
              'birthNameS': bName
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}else{
    alert('This entry has not been deleted.')
}
}

async function addLike(){
    const sName = this.parentNode.childNodes[1].innerText
    const bName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'nameS': sName,
              'birthNameS': bName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

function displayInfo(){
    fetch('/displayInfo')
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
}
// //trying to set up console.log for data from api
// async function displayInfo(){
//     //const sName = this.parentNode.childNodes[1].innerText
//     try{
      
//         const data = await response.json()//.stringify()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }