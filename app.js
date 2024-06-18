const cards = document.querySelectorAll('.card')

function shuffleCards(){
    cards.forEach(card => {
        const randomPos = Math.trunc(Math.random() * 12 )
        // console.log(randomPos);
        card.style.order = randomPos
    });         
}
shuffleCards()

cards.forEach(card => card.addEventListener("click", flipCard))

let lockedCards = false;
let cardsPicked = [];

function flipCard(e){

    if(lockedCards)return

    saveCard(e.target.children[0], e.target.getAttribute('data-attr'))
    if(cardsPicked.length === 2) result()

}

function saveCard(el, value){
    if(el === cardsPicked[0]?.el) return
    el.classList.add('active')
    cardsPicked.push({el, value})
    console.log(cardsPicked);
}

function result(){
    saveNumberOftries()
    if(cardsPicked[0].value === cardsPicked[1].value ){
        // On remove l'event si on trouve deux même élément.
        cardsPicked[0].el.parentElement.removeEventListener('click', flipCard)
        cardsPicked[1].el.parentElement.removeEventListener('click', flipCard)
        cardsPicked = []
        return;
    }
    lockedCards = true;

    setTimeout(() => {
        // Au bout d'1s les deux cartes différentes vont se retourner
        cardsPicked[0].el.classList.remove('active')
        cardsPicked[1].el.classList.remove('active')
        cardsPicked = [];
        lockedCards = false; //On verouille les autres carte au clic
    }, 1000)
}

const innerCards = [...document.querySelectorAll('.double-face')];
const advice = document.querySelector('.advice')
const score = document.querySelector('.score')

let numberOfTries = 0;
function saveNumberOftries(){
    numberOfTries++
    const checkForEnd = innerCards.filter(card => !card.classList.contains("active"))
    if(!checkForEnd.length){
        advice.textContent = `Bravo 🎊! Appuyez sur "espace" pour relancer une partie`
        score.textContent = `Votre score final : ${numberOfTries}`
        return
    }
    score.textContent = `Nombre de coups : ${numberOfTries}`
}
window.addEventListener('keydown', handleResart)

let shuffleLock = false;
function handleResart(e) {
    e.preventDefault()
    if(e.keyCode === 32){
        innerCards.forEach(card => card.classList.remove('active'))
        advice.textContent = `Tentez de gagner avec le moins d'essais possible.`
        score.textContent = `Nombre de coups : 0`
        numberOfTries = 0
        cards.forEach(card => card.addEventListener('click', flipCard))

        if(shuffleLock) return
        shuffleLock = true
        setTimeout(() => {
            shuffleCards()
            shuffleLock = false
        }, 600)
    }

}