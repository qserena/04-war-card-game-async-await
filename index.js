let deckId = ''

const newDeck = document.getElementById('new-deck')
const cardsContainer = document.getElementById('cards')
const drawCardBtn = document.getElementById('draw-btn')
const result = document.getElementById('result')
const computerScoreEl = document.getElementById('computer-score')
const myScoreEl = document.getElementById('my-score')
const remainingCardsEl = document.getElementById('remaining-cards')

let remainingCards = ''
let computerScore = 0
let myScore = 0

async function handleClick() {
	const res = await fetch(
		'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'
	)
	const data = await res.json()
	deckId = data.deck_id
	const slots = cardsContainer.children
	slots[0].innerHTML = ``
	slots[1].innerHTML = ``
	computerScore = 0
	myScore = 0
	computerScoreEl.textContent = `Computer score: 0`
	myScoreEl.textContent = `Your score: 0`
	drawCardBtn.disabled = false
	result.textContent = `Game of War`
	remainingCardsEl.innerText = `Remaining cards: 52`
}

async function drawCards() {
	const res = await fetch(
		`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
	)
	const data = await res.json()
	const slots = cardsContainer.children
	remainingCards = data.remaining

	remainingCardsEl.innerText = `Remaining cards: ${remainingCards}`
	const card1 = data.cards[0]
	const card2 = data.cards[1]
	result.innerText = getWinner(card1, card2)

	if (remainingCards === 0) {
		drawCardBtn.disabled = true

		if (computerScore > myScore) {
			result.textContent = `Computer wins by ${computerScore} - ${myScore}!`
		} else if (myScore > computerScore) {
			result.textContent = `Congrats!!! You won by ${myScore} - ${computerScore}!`
		} else {
			result.textContent = `Game over! It's a tie game! ${computerScore} - ${myScore}!`
		}
	}

	slots[0].innerHTML = `
            <img src='${card1.image}' class='card'/>
            `
	slots[1].innerHTML = `
            <img src='${card2.image}' class='card'/>
            `
}

function getWinner(card1, card2) {
	const cardValues = [
		'2',
		'3',
		'4',
		'5',
		'6',
		'7',
		'8',
		'9',
		'10',
		'JACK',
		'QUEEN',
		'KING',
		'ACE',
	]
	const index1 = cardValues.indexOf(card1.value)
	const index2 = cardValues.indexOf(card2.value)
	if (index1 > index2) {
		computerScore++
		computerScoreEl.textContent = `Computer score: ${computerScore}`
		return 'Computer wins!'
	} else if (index2 > index1) {
		myScore++
		myScoreEl.textContent = `My score: ${myScore}`
		return 'You win!'
	} else {
		return 'War!'
	}
}

newDeck.addEventListener('click', handleClick)
drawCardBtn.addEventListener('click', drawCards)
