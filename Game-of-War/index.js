//Access the DOM
const btnNewDeck = document.getElementById('new-deck')
const btnDraw = document.getElementById('draw-cards')
const cardContainer = document.getElementById('card-container')


//Variables
let deckId

//Functions
function getNewDeck() {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then (res => res.json())
    .then (data => {
        deckId = data.deck_id
        console.log(deckId)
    })
}

function drawCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then (res => res.json())
    .then( data => {
        console.log(data.cards)
        const cards = data.cards.map(card => 
            `<img class="card" src="${card.image}"></img>`
            )
        cardContainer.innerHTML= cards
        const cardOneValue = data.cards[0].value
        const cardTwoValue = data.cards[1].value
        console.log(cardOneValue)
        console.log(cardTwoValue)
    })
}

function roundWinner() {
    
}

//Event Listeners
btnNewDeck.addEventListener('click', getNewDeck)
btnDraw.addEventListener('click', drawCards)