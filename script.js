import { render, addPlayer, clearPlayerList } from './functions.js'


const form = document.querySelector('#add_player_form')
const randomizeBtn = document.querySelector('#randomize')
const clearBtn = document.querySelector('#clear')

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