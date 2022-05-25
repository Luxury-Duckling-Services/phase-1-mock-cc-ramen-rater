// write your code here

let ramens = []
let i = 0
let selectedId = 1

fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(objects => {
    ramens = [...objects]
    i = ramens.length + 1
    showOneRamen(ramens[0])
    initialize(ramens)
    newRamenFormInit()
    editRamenFormInit()
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

        newRamen( i , newRamenForm.name.value , newRamenForm.restaurant.value , newRamenForm.image.value , newRamenForm.rating.value , newRamenForm['new-comment'].value)

        i += 1
    })
}

function newRamen(i , name , restaurant , image , rating , comment) {
    let ramen = {
        id : i,
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