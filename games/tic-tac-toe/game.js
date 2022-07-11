console.log('Welcome to Tic-Tac-Toe! Enjoy!')

let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

let player = 'O'
let winner = ''

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    document.getElementById(`${i}${j}`).addEventListener('click', clickTile)
  }
}

document.getElementById('init').addEventListener('click', resetBoard)

function clickTile(e) {
  if (!e) var e = window.event // Get the window event
  e.cancelBubble = true // IE Stop propagation
  if (e.stopPropagation) e.stopPropagation() // Other Broswers
  if (e.target.innerHTML === '') {
    board[e.target.id[0]][e.target.id[1]] = player
  } else {
    // Handle not allowed
    // e.target.style.color = 'red'
  }
  updateBoard()
  checkGameWin()
  changePlayer()
}

function changePlayer() {
  if (player === 'O') player = 'X'
  else player = 'O'
}

function updateBoard() {
  board.forEach((row, i) =>
    row.forEach(
      (cell, j) => (document.getElementById(`${i}${j}`).innerHTML = cell)
    )
  )
}

function checkGameWin() {
  // Check horizontal
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== ''
    ) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(`${i}${j}`).style.color = 'yellow'
      }
      winner = board[i][0]
    }
  }
  // Check vertical
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== ''
    ) {
      for (let j = 0; j < 3; j++) {
        document.getElementById(`${j}${i}`).style.color = 'yellow'
      }
      winner = board[0][i]
    }
  }
  // Check diagonal
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ''
  ) {
    document.getElementById('00').style.color = 'yellow'
    document.getElementById('11').style.color = 'yellow'
    document.getElementById('22').style.color = 'yellow'
    winner = board[0][0]
  }

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ''
  ) {
    document.getElementById('02').style.color = 'yellow'
    document.getElementById('11').style.color = 'yellow'
    document.getElementById('20').style.color = 'yellow'
    winner = board[0][2]
  }
  if (winner !== '')
    document.getElementById('winner').innerHTML = `The winner is ${winner}!`
}

function resetBoard() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  player = 'O'
  winner = ''
  console.log(board)
  updateBoard()
}
