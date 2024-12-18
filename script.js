import { render, addPlayer } from './functions.js'


const form = document.querySelector('#add_player_form')
const randomizeBtn = document.querySelector('#randomize')

const randomize = () => {
  render(true)
}

randomizeBtn.addEventListener('click', randomize)

// player object = { name: 'player name', commander: 'commander name' }
form.addEventListener('submit', (e) => {
  e.preventDefault()
  addPlayer()
})

render()