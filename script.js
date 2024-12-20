import { render, addPlayer, removePlayer } from './functions.js'


const form = document.querySelector('#add_player_form')
const randomizeBtn = document.querySelector('#randomize')
const deleteBtns = document.querySelectorAll('.delete-btn')

const randomize = () => {
  render(true)
}

randomizeBtn.addEventListener('click', randomize)

form.addEventListener('submit', (e) => {
  e.preventDefault()
  addPlayer()
})

render()