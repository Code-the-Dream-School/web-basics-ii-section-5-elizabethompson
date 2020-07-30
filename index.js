const currentPlayerEl = document.getElementById('turn_player')

const player1 = {
  name: prompt("What's your name, player 1?"),
  numShips: 4,
  gameEl: {
    board: document.getElementById('board_player1'),
    name: document.getElementById('name_player1'),
    ships: document.getElementById('ships_player1'),
  },
}

const player2 = {
  name: prompt("What's your name, player 2?"),
  numShips: 4,
  gameEl: {
    board: document.getElementById('board_player2'),
    name: document.getElementById('name_player2'),
    ships: document.getElementById('ships_player2'),
  },
}

let currentPlayer

const setCurrentPlayer = (player) => {
  currentPlayer = player
  currentPlayerEl.innerHTML = player.name
}

// default current player to player 1
setCurrentPlayer(player1)

const strikeBoard = (event) => {
  // retrieve the clicked element from the click event, which is the <div> board cell
  const cellEl = event.target
  // retrieve the "grandparent" of the clicked board cell, which is the <ul> game board
  const boardEl = cellEl.parentNode.parentNode

  // check if cell belongs to the current player's board, if so return (stop)
  if (boardEl === currentPlayer.gameEl.board) return

  // opponent
  const opponent = currentPlayer === player1 ? player2 : player1

  // do the game
  if (cellEl.value === 1) {
    opponent.numShips--
    opponent.gameEl.ships.innerText = opponent.numShips

    // change the color of the clicked board cell
    cellEl.style.backgroundColor = '#e71d36'
  } else {
    // change the color of the clicked board cell
    cellEl.style.backgroundColor = '#5e6472'
  }

  if (opponent.numShips <= 0) {
    currentPlayerEl.innerHTML = `Congratulations, ${currentPlayer.name}! You win.`
    cellEl.removeEventListener('click', strikeBoard)
    return
  }

  // switch the current player
  setCurrentPlayer(opponent)
}

const drawBoard = (boardEl) => {
  for (var x = 0; x < 4; x++) {
    const li = document.createElement('li')

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div')
      cell.className = 'square'
      cell.textContent = `${x},${y}`
      cell.value = 0
      cell.addEventListener('click', strikeBoard)

      li.appendChild(cell)
    }

    boardEl.appendChild(li)
  }
}

const placeShips = (boardEl) => {
  const randomCoordinates = { x: 0, y: 0 }
  let addedShipCount = 0

  while (addedShipCount < 4) {
    let { x, y } = randomCoordinates
    x = Math.floor(Math.random() * Math.floor(4))
    y = Math.floor(Math.random() * Math.floor(4))

    let boardRow = boardEl.getElementsByTagName('li')[x]
    let boardCell = boardRow.getElementsByTagName('div')[y]

    if (boardCell.value !== 1) {
      boardCell.value = 1
      console.log(boardCell.innerText) // log out ship coords for testing
      addedShipCount++
    }
  }
}

// display player names on page
player1.gameEl.name.innerText = player1.name
player2.gameEl.name.innerText = player2.name

// display player number of ships on page
player1.gameEl.ships.innerText = player1.numShips
player2.gameEl.ships.innerText = player2.numShips

// draw game board for both players
drawBoard(player1.gameEl.board)
drawBoard(player2.gameEl.board)

// place ships on game board for both players
placeShips(player1.gameEl.board)
placeShips(player2.gameEl.board)
