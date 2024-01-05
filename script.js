const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
    const cellIndex = event.target.dataset.index;

    if (gameActive && gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        event.target.innerText = currentPlayer;

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (isBoardFull()) {
            alert("It's a tie!");
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            highlightWinningCells(condition);
            return true;
        }
    }

    return false;
}

function highlightWinningCells(cells) {
    for (const cellIndex of cells) {
        document.querySelector(`[data-index="${cellIndex}"]`).style.backgroundColor = '#bada55';
    }
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}
