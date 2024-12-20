const pod_count = { value: 0 }
const playerInput = document.querySelector('#add_player')
const pods = document.querySelector('#pods')
let clearBtnDiv = document.querySelector('#clear-button')
let storedPlayers = JSON.parse(localStorage.getItem('players')) || []

export const shuffle = (array) => {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

export const createClearButton = () => {
  let clearBtn = document.createElement('button')
  clearBtn.id = 'clear'
  clearBtn.innerText = 'Clear'
  clearBtn.className = 'btn'
  clearBtn.addEventListener('click', clearPlayerList)

  clearBtnDiv.innerHTML = ''
  clearBtnDiv.appendChild(clearBtn)
}

export const addPlayer = () => {
  // for adding players to the players array
  // don't forget to rerender the page
  const value = playerInput.value
  storedPlayers.push({ name: value })

  localStorage.setItem('players', JSON.stringify(storedPlayers))

  playerInput.value = ''

  render()
}

export const removePlayer = (value) => {
  storedPlayers = storedPlayers.filter(player => { return player.name != value })
  if (storedPlayers.length === 0) {
    clearPlayerList()
  }
  localStorage.setItem('players', JSON.stringify(storedPlayers))

  render()
}

export const createPlayerListItem = (player) => {
  let div = document.createElement('div')
  let deleteBtn = document.createElement('div')
  
  deleteBtn.className = 'delete-btn flex items-center'
  deleteBtn.style.maxWidth = '24px'
  deleteBtn.innerHTML = '<svg class="trash-can" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>'
  deleteBtn.addEventListener('click', () => {
    removePlayer(player.name)
  })

  div.className = 'w-full flex items-center justify-between'
  div.innerHTML = `<div>${player.name}</div>` 
  div.appendChild(deleteBtn) 

  let li = document.createElement('li')
  li.className = 'rounded-sm'
  li.append(div)
  return li
}

export const createPlayerList = (players, div, group_size = 5) => {
  let pod_div = document.createElement('div')
  pod_div.className = 'pod-div rounded-md'

  let pod = document.createElement('ul')
  for (let i=0; i<group_size; i++) {
    pod.appendChild(createPlayerListItem(players.shift()))
  }
  if (group_size === 3) {
    pod.appendChild(createPlayerListItem({ name: '-' }))
  }
  let pod_heading = document.createElement('span')
  pod_heading.innerText = 'Players'

  pod_div.appendChild(pod_heading)
  pod_div.appendChild(pod)

  div.prepend(pod_div)
}

export const applyPodHeadings = () => {
  let headings = document.querySelectorAll('.pod-div span')
  for (let heading of headings) {
    heading.innerText = 'Pod ' + ++pod_count.value
  }
}

export const clearPlayerList = () => {
  storedPlayers = []
  localStorage.setItem('players', JSON.stringify(storedPlayers))

  clearBtnDiv.innerHTML = ''

  render()
}

export const render = (randomize = false) => {
  pod_count.value = 0
  pods.innerHTML = ''

  let tempPlayers = Array.from(storedPlayers)
  
  if (!tempPlayers.length) {
    pods.innerHTML = `<span class="heading fw-light text-light italic text-center">Add players to get started...</span>`
    return
  }

  if (!randomize) {
    createPlayerList(tempPlayers, pods, tempPlayers.length)
    createClearButton()
    return
  }

  shuffle(tempPlayers)
  if (tempPlayers.length < 6) {
    createPlayerList(tempPlayers, pods, tempPlayers.length)
  }
  
  if (tempPlayers.length % 4 === 1) {
    for (let i=0; i<3; i++) {
      createPlayerList(tempPlayers, pods, 3)
    }
  }
  
  if (tempPlayers.length % 4 === 2) {
    for (let i=0; i<2; i++) {
      createPlayerList(tempPlayers, pods, 3)
    }
  }
  
  if (tempPlayers.length % 4 === 3) {
    createPlayerList(tempPlayers, pods, 3)
  }
  
  if (tempPlayers.length % 4 === 0) {
    while (tempPlayers.length) {
      createPlayerList(tempPlayers, pods, 4)
    }
  }

  createClearButton()

  applyPodHeadings()
  
}