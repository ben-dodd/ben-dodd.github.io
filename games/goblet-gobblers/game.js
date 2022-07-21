// Initialise variables

const winCombos = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['1', '5', '9'],
  ['3', '5', '7'],
]

let dragged = null
let winner = ''
let player = 'green'
let isStalemate = false

let board = resetBoard()

// Setup event listeners
document.querySelectorAll('.tile').forEach((tile) => {
  tile.addEventListener('drop', handleDropOnTile)
  tile.addEventListener('dragenter', handleDragEnter)
  tile.addEventListener('dragleave', handleDragLeave)
  tile.addEventListener('dragend', handleDragEnd)
  tile.addEventListener('dragover', blockDraggable)
})

function blockDraggable(e) {
  e.preventDefault()
  e.stopPropagation()
}

document.getElementById('init').addEventListener('click', resetBoard)

function handleDragStart(e) {
  this.style.opacity = 0
  // e.target.src = `./assets/piece-scared.gif`
  dragged = e.target
}

function handleDragEnd(e) {
  this.style.opacity = 1
}

function handleDragOver(e) {
  e.stopPropagation() // stops the browser from redirecting.
  e.preventDefault()
  return false
}

function handleDragEnter(e) {
  e.stopPropagation() // stops the browser from redirecting.
  this.classList.add('over')
}

function handleDragLeave(e) {
  e.stopPropagation() // stops the browser from redirecting.
  this.classList.remove('over')
}

function handleDropOnTile(e) {
  e.stopPropagation() // stops the browser from redirecting.
  // move dragged element to the selected drop target
  handleDrop(dragged, e.target)
}

function handleDropOnPiece(e) {
  e.stopPropagation() // stops the browser from redirecting.
  // move dragged element to the selected drop target
  let tile = e.target.parentNode
  // Check it is being dragged to a tile
  if (tile && tile.classList.value.includes('tile')) {
    handleDrop(e.target, tile)
  } else {
    // Go back to tray
  }
}

function handleDrop(piece, tile) {
  tile.classList.remove('over')
  if (tile.lastChild) {
    // There is already a piece here
    // Check it is smaller than the added piece
    let defender = tile.lastChild
    let attacker = dragged
    if (getSize(attacker) > getSize(defender)) {
      defender.remove()
      placePiece(attacker, tile)
    } else {
      // Handle defeat
    }
  } else {
    placePiece(piece, tile)
  }
}

function handleHoverOverPiece(e) {
  let defender = e.target
  let attacker = dragged
  if (getSize(attacker) > getSize(defender)) {
    attacker.src = `assets/piece-happy.gif`
    defender.src = `assets/piece-scared.gif`
  } else {
    attacker.src = `assets/piece-worried.gif`
    defender.src = `assets/piece-happy.gif`
  }
}

function handleLeavePiece(e) {
  let defender = e.target
  let attacker = dragged
  if (getSize(attacker) > getSize(defender)) {
    attacker.src = `assets/piece-happy.gif`
    defender.src = `assets/piece-happy.gif`
  } else {
    attacker.src = `assets/piece-worried.gif`
    defender.src = `assets/piece-sleepy.gif`
  }
}

function handleClick(e) {
  e.target.src = `./assets/piece-scared.gif`
}

function placePiece(piece, tile) {
  piece.parentNode.removeChild(piece)
  piece.draggable = false
  tile.appendChild(piece)
  switchPlayers()
  // if (winner || isStalemate) resetBoard()
  // if (e.target.innerHTML === '') {
  //   board[e.target.id[0]][e.target.id[1]].player = isNoughtsTurn ? 'O' : 'X'
  //   changePlayer()
  //   checkStaleMate()
  //   checkGameWin()
  //   updateBoard()
  // } else {
  // Handle not allowed
  // e.target.style.color = 'red'
  // }
}

function updateBoard() {
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      document.getElementById(`${i}${j}`).innerHTML = cell?.player
      if (cell?.player)
        document.getElementById(`${i}${j}`).classList.remove('clickable')
      else document.getElementById(`${i}${j}`).classList.add('clickable')
      document.getElementById(`${i}${j}`).style.color = cell?.win
        ? 'orange'
        : 'black'
    })
  )
  const title = document.getElementById('title')
  if (isStalemate) title.innerHTML = 'Stalemate!'
  else if (winner !== '') title.innerHTML = `The winner is ${winner}!`
  else title.innerHTML = `${isNoughtsTurn ? 'O' : 'X'}'s turn...`
}

function checkGameWin() {
  if (isStalemate) return null
  winCombos.forEach((combo) => {
    let cells = [
      board[combo[0][0]][combo[0][1]],
      board[combo[1][0]][combo[1][1]],
      board[combo[2][0]][combo[2][1]],
    ]
    if (
      cells[0]?.player === cells[1]?.player &&
      cells[1]?.player === cells[2]?.player &&
      cells[0]?.player
    ) {
      cells[0].win = true
      cells[1].win = true
      cells[2].win = true
      winner = cells[0]?.player
    }
  })
}

function checkStaleMate() {
  console.log('checking stalemate')
  let stalemateCheck = true
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      console.log(Boolean(cell.player))

      if (!cell.player) stalemateCheck = false
    })
  )
  isStalemate = stalemateCheck
}

function resetBoard() {
  // board = initBoard()
  // isNoughtsTurn = true
  // isStalemate = false
  // winner = ''
  // updateBoard()
  resetTray(document.getElementById('pieces-tray-left'), 'green')
  resetTray(document.getElementById('pieces-tray-right'), 'purple')
}

function resetTray(tray, color) {
  for (let i = 1; i < 7; i++) {
    const piece = document.createElement('img')
    piece.src = `./assets/piece-happy.gif`
    piece.draggable = color === player
    piece.className = `piece ${color} size-${i}`
    piece.addEventListener('click', handleClick)
    piece.addEventListener('dragstart', handleDragStart)
    piece.addEventListener('dragend', handleDragEnd)
    piece.addEventListener('drop', handleDropOnPiece)
    piece.addEventListener('dragenter', handleHoverOverPiece)
    piece.addEventListener('dragleave', handleLeavePiece)
    piece.addEventListener('dragend', blockDraggable)
    piece.addEventListener('dragover', blockDraggable)
    tray.appendChild(piece)
    // setInterval(() => handleSleep(piece), random(300, 10000))
  }
}

function getSize(piece) {
  return parseInt(piece.className.slice(-1))
}

// clearInterval(timer)
// timer = setInterval(handleMole, random(200, 3000))

function handleSleep(piece) {
  // console.log(piece)
  piece.src = `./assets/piece-sleepy.gif`
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
// const audio = new Audio('whack-audio.wav')

function switchPlayers() {
  player = player === 'purple' ? 'green' : 'purple'
  document.getElementById('title').innerText = `${player}'s TURN`.toUpperCase()
  document.querySelectorAll('.piece').forEach((piece) => {
    console.log(piece.className)
    console.log(piece.draggable)
    piece.draggable = !piece.draggable
  })
}
