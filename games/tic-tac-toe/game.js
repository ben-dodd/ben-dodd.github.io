// Initialise variables

const initBoard = () =>
  Array(3)
    .fill()
    .map(() =>
      Array(3)
        .fill()
        .map(() => ({ player: '' }))
    )

const winCombos = [
  ['00', '01', '02'],
  ['10', '11', '12'],
  ['20', '21', '22'],
  ['00', '10', '20'],
  ['01', '11', '21'],
  ['02', '12', '22'],
  ['00', '11', '22'],
  ['02', '11', '20'],
]

let board = initBoard()

let winner = ''
let isNoughtsTurn = true
let isStalemate = false

// Setup event listeners

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    document.getElementById(`${i}${j}`).addEventListener('click', clickTile)
  }
}

document.getElementById('init').addEventListener('click', resetBoard)

function clickTile(e) {
  if (winner || isStalemate) resetBoard()
  if (e.target.innerHTML === '') {
    board[e.target.id[0]][e.target.id[1]].player = isNoughtsTurn ? 'O' : 'X'
    changePlayer()
    checkStaleMate()
    checkGameWin()
    updateBoard()
  } else {
    // Handle not allowed
    // e.target.style.color = 'red'
  }
}

const changePlayer = () => (isNoughtsTurn = !isNoughtsTurn)

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
  board = initBoard()
  isNoughtsTurn = true
  isStalemate = false
  winner = ''
  updateBoard()
}
