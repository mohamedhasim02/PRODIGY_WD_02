const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const status = document.querySelector('.status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-cell'));

    if (gameBoard[cellIndex] !== '' || !gameActive) return;

    updateBoard(cellIndex);
    checkResult();
}

function updateBoard(cellIndex) {
    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkResult() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            cells[a].style.backgroundColor = 'green';
            cells[b].style.backgroundColor = 'green';
            cells[c].style.backgroundColor = 'green';
            status.textContent = `Player ${gameBoard[a]} wins!`;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        status.textContent = "It's a draw!";
    }
}

function handleReset() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#ddd';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleReset);
