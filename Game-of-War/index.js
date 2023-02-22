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
async function getNewDeck() {
    const res = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await res.json()
    deckId = data.deck_id
    btnDraw.disabled = false
    btnNewDeck.style.opacity = '0'
    cardContainer.innerHTML = `<h2 id="draw-text" class="draw-text">Draw Cards</h2>`
    roundsEl.innerHTML = ''
}

async function drawCards() {
    const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const data = await res.json()
    const cards = data.cards.map(card => 
        `<img class="card" src="${card.image}"></img>`
        ).join('')
    cardContainer.innerHTML = cards
    const cardOneValue = data.cards[0].value
    const cardTwoValue = data.cards[1].value
    roundWinner(cardOneValue, cardTwoValue)
    draws ++
    roundsEl.innerHTML = `<p>Draw: ${draws}/26</p>`
    if (data.remaining === 0) {
        btnDraw.disabled = true
        setTimeout(() => endGame(playerCount, computerCount), 1000)
      }     
}

function roundWinner(player, computer) {
    const cardArr = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const playerValue = cardArr.indexOf(player)
    const computerValue = cardArr.indexOf(computer)
    if( playerValue === computerValue) {
        playerEl.style.textDecoration = 'none'
        computerEl.style.textDecoration = 'none'
    } else if(playerValue > computerValue) {
        playerCount ++
        playerEl.style.textDecoration = 'underline'
        computerEl.style.textDecoration = 'none'
    } else {
        computerCount ++
        playerEl.style.textDecoration = 'none'
        computerEl.style.textDecoration = 'underline'
    } 
    playerEl.textContent = "Player: " + playerCount
    computerEl.textContent = "Computer: " + computerCount
}

function endGame(player, computer) {
    player > computer ? winnerEl.innerHTML = `<h1>Player wins!</h1>` :
    computer > player ? winnerEl.innerHTML = `<h1>Computer wins!</h1>` :
    winnerEl.innerHTML = `<h1>Tie!<h1>`
    playerEl.style.textDecoration = 'none'
    computerEl.style.textDecoration = 'none'
    roundsEl.innerHTML = ''
    cardContainer.innerHTML = ''
    const fireworks = new Fireworks.default(cardContainer)
    fireworks.start()
    setTimeout(newGame, 7000)   
}

function newGame() {
    playerCount = 0
    computerCount = 0
    draws = 0
    winnerEl.innerHTML = `<h1>Game of War</h1>`
    playerEl.textContent = "Player: " + playerCount
    computerEl.textContent = "Computer: " + computerCount
    cardContainer.innerHTML = ''
    btnNewDeck.style.opacity = '1'
}

//Event Listeners
btnNewDeck.addEventListener('click', getNewDeck)
btnDraw.addEventListener('click', drawCards)