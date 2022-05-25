// write your code here

let ramens = []

fetch('http://localhost:3000/ramens')
.then(resp => resp.json())
.then(objects => {
    ramens = [...objects]
    initialize(ramens)
    newRamen()
})

const ramenMenu = document.getElementById('ramen-menu')

const ramenDetailImg = document.querySelector('#ramen-detail .detail-image')
const ramenDetailName = document.querySelector('#ramen-detail .name')
const ramenDetailRestaurant = document.querySelector('#ramen-detail .restaurant')
const ratingDisplay = document.getElementById('rating-display')
const commentDisplay = document.getElementById('comment-display')

function initialize(ramens) {
    ramens.forEach(ramen => {
        renderOneRamen(ramen)
    })
}

function renderOneRamen(ramen) {
    const img = document.createElement('img')
        img.setAttribute('src', ramen.image)
        
        img.addEventListener('click' , () => {
            ramenDetailImg.setAttribute('src' , ramen.image)
            ramenDetailImg.setAttribute('alt' , ramen.name)

            ramenDetailName.textContent = ramen.name

            ramenDetailRestaurant.textContent = ramen.restaurant
            ratingDisplay.textContent = ramen.rating
            commentDisplay.textContent = ramen.comment
        })
        
        ramenMenu.append(img)
}

const form = document.getElementById('new-ramen')

function newRamen() {
    let i = ramens.length + 1
    form.addEventListener('submit' , (e)=>{
        e.preventDefault()

        let ramen = {
            id : i,
            name : form.name.value ,
            restaurant: form.restaurant.value ,
            image: form.image.value ,
            rating: form.rating.value ,
            comment: form['new-comment'].value
        }
        renderOneRamen(ramen)
        ramens[ramens.length] = ramen
    })
}
