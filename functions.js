const pod_count = { value: 0 }
const playerInput = document.querySelector('#add_player')
const pods = document.querySelector('#pods')
let clearBtnDiv = document.querySelector('#clear-button')
let storedPlayers = JSON.parse(localStorage.getItem('players'))

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

export const createPlayerListItem = (player) => {
  let li = document.createElement('li')
  li.className = 'rounded-sm'
  li.innerText = player.name
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