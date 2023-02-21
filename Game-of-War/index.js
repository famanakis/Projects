//Access the DOM
const btnNewDeck = document.getElementById('new-deck')
const btnDraw = document.getElementById('draw-cards')
const cardContainer = document.getElementById('card-container')
const winnerEl = document.getElementById('winner-el')
const playerEl = document.getElementById('player-el')
const computerEl = document.getElementById('computer-el')
const roundsEl = document.getElementById('rounds-left-el')

//Variables
let deckId
let playerCount = 0
let computerCount = 0
let draws = 0

//Functions
function getNewDeck() {
    fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then (res => res.json())
    .then (data => {
        deckId = data.deck_id
        btnDraw.disabled = false
        cardContainer.innerHTML = `<h2>Draw Cards</h2>`
        roundsEl.innerHTML = ''
    })
}

function drawCards() {
    fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then (res => res.json())
    .then( data => {
        const cards = data.cards.map(card => 
            `<img class="card" src="${card.image}"></img>`
            ).join('')
        cardContainer.innerHTML= cards
        const cardOneValue = data.cards[0].value
        const cardTwoValue = data.cards[1].value
        roundWinner(cardOneValue, cardTwoValue)
        draws ++
        roundsEl.innerHTML = `<p>Draw: ${draws}/26</p>`
        if(data.remaining === 0) {endGame(playerCount, computerCount)}
    })
}

function endGame(player, computer) {
    player > computer ? winnerEl.innerHTML = `<h1>Player wins!</h1>` :
    computer > player ? winnerEl.innerHTML = `<h1>Computer wins!</h1>` :
    winnerEl.innerHTML = `<h1>Tie!<h1>`
    roundsEl.innerHTML = ''
    cardContainer.innerHTML = ''
    btnDraw.disabled = true
    const fireworks = new Fireworks.default(cardContainer)
    fireworks.start()
    setTimeout(newGame, 12000)   
}

function newGame() {
    playerCount = 0
    computerCount = 0
    winnerEl.innerHTML = `<h1>Game of War</h1>`
    cardContainer.innerHTML = `<button type="button" id="new-deck" class="btn btn-new-deck">Draw a New Deck</button>`
    playerEl.textContent = "Player: " + playerCount
    computerEl.textContent = "Computer: " + computerCount
    btnNewDeck.style.display = 'visible'
}

function roundWinner(player, computer) {
    const cardArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const playerValue = cardArr.indexOf(player)
    const computerValue = cardArr.indexOf(computer)
    if( playerValue === computerValue) {
    } else if(playerValue > computerValue) {
        playerCount ++
    } else {
        computerCount ++
    } 
    playerEl.textContent = "Player: " + playerCount
    computerEl.textContent = "Computer " + computerCount
}

//Event Listeners
btnNewDeck.addEventListener('click', getNewDeck)
btnDraw.addEventListener('click', drawCards)