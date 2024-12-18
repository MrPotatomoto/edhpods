import { render, addPlayer, clearPlayerList } from './functions.js'


const form = document.querySelector('#add_player_form')
const randomizeBtn = document.querySelector('#randomize')

const randomize = () => {
  render(true)
}

randomizeBtn.addEventListener('click', randomize)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addPlayer()
})

render()