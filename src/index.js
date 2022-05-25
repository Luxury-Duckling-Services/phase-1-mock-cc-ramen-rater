// write your code here

let ramens = []
let nextId = 0
let selectedId = 1

fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(objects => {
    ramens = [...objects]
    nextId = ramens.length + 1
    showOneRamen(ramens[0])
    initialize(ramens)
    newRamenFormInit()
    editRamenFormInit()
    deleteRamenFormInit()
})

//

const ramenMenu = document.getElementById('ramen-menu')

const ramenDetailImg = document.querySelector('#ramen-detail .detail-image')
const ramenDetailName = document.querySelector('#ramen-detail .name')
const ramenDetailRestaurant = document.querySelector('#ramen-detail .restaurant')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')

//

function initialize(ramens) {
    ramens.forEach(ramen => {
        renderOneRamen(ramen)
    })
} 

function showOneRamen(ramen) {
    ramenDetailImg.setAttribute('src' , ramen.image)
    ramenDetailImg.setAttribute('alt' , ramen.name)

    ramenDetailName.textContent = ramen.name

    ramenDetailRestaurant.textContent = ramen.restaurant
    ratingDisplay.textContent = ramen.rating
    commentDisplay.textContent = ramen.comment

    selectedId = ramen.id
}

function renderOneRamen(ramen) {
    const img = document.createElement('img')
    
    img.setAttribute('src', ramen.image)
        
    img.addEventListener('click' , () => {
        showOneRamen(ramen)
    })
        
    ramenMenu.append(img)
}

//

const newRamenForm = document.getElementById('new-ramen')

function newRamenFormInit() {
    newRamenForm.addEventListener('submit' , (e)=>{
        e.preventDefault()

        newRamen( nextId , newRamenForm.name.value , newRamenForm.restaurant.value , newRamenForm.image.value , newRamenForm.rating.value , newRamenForm['new-comment'].value)

        nextId += 1
    })
}

function newRamen(nextId , name , restaurant , image , rating , comment) {
    let ramen = {
        id : nextId,
        name : name ,
        restaurant: restaurant ,
        image: image ,
        rating: rating ,
        comment: comment
    }
    renderOneRamen(ramen)
    ramens[ramens.length] = ramen
}

//

const editRamenForm = document.getElementById('edit-ramen')

function editRamenFormInit() {
    editRamenForm.addEventListener('submit' , (e)=>{
        e.preventDefault()

        editRamen(selectedId)
    })
}

function editRamen(selectedId) {
        
    ratingDisplay.textContent = editRamenForm.rating.value
    commentDisplay.textContent = editRamenForm['new-comment'].value

    ramens[selectedId - 1].rating = editRamenForm.rating.value
    ramens[selectedId - 1].comment = editRamenForm['new-comment'].value
}

//

const deleteRamenForm = document.getElementById('delete-ramen')

function deleteRamenFormInit() {
    deleteRamenForm.addEventListener('submit' , (e)=>{
        e.preventDefault()

        if (ramens.length > 1){
            deleteRamen(selectedId)
        } else {
            alert('This is the last ramen. Cannot delete.')
        }

    })
}

function deleteRamen(selectedId){
    ramens.forEach( (ramen , index) => {
        if (ramen.id === selectedId) {
            ramenMenu.children[index].remove()
            let removed = index
            ramens.splice(removed , 1)
        }
    })
    showOneRamen(ramens[0])
}