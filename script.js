let turn = 'x';
let arrayitem = Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => null));
let title = document.querySelector('.title');
let fin = 81;
let currentBoard = -1;
let wonBoards = Array.from({ length: 9 }, () => [null, null]);

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        arrayitem[i][j] = document.querySelector(`#box${i + 1} #box${i + 1}-item${j + 1}`);
        arrayitem[i][j].addEventListener('click', () => game(arrayitem[i][j], i, j));
    }
}

if (currentBoard == -1) {
    title.innerHTML += " (shoes in yellow box)";
}

function game(item, box, index) {
    if (item.textContent === '') {
        if (currentBoard !== -1 && currentBoard !== box) {
            title.innerHTML=`You must play in the highlighted board <span>turn: ${turn}</span>`;
            return;
        }

        item.textContent = turn;
        if (checkWin(arrayitem[box])) {
            wonBoards[box] = [box, turn];
            let gameDiv = document.querySelector(`#box${box + 1} .game`);
            gameDiv.innerHTML += `<div class="result">${turn.toUpperCase()}</div>`;
        }

        if (checkOverallWin()) {
            setTimeout(() => alert(`${turn.toUpperCase()} wins the game!`), 10);
            resetGame();
        } else {
            turn = turn === 'x' ? 'o' : 'x';
            title.textContent = turn.toUpperCase();
            fin--;
            currentBoard = index;
            highlightNextBoard();
        }
    }

    if (fin === 0) {
        setTimeout(() => alert(`Game over, no one wins.`), 10);
        resetGame();
    }
}

function checkWin(board) {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (board[a].textContent && board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
            return true;
        }
    }
    return false;
}

function checkOverallWin() {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i];
        if (wonBoards[a][1] === turn && wonBoards[b][1] === turn && wonBoards[c][1] === turn) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    setTimeout(() => {
        let results = document.querySelectorAll('.result');
        results.forEach(result => result.remove());

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (arrayitem[i][j]) { 
                    arrayitem[i][j].textContent = '';
                }
            }
        }

        
        turn = 'x';
        fin = 81;
        title.innerHTML = `<span>X O</span> GAME`;
        currentBoard = -1;

        wonBoards = Array.from({ length: 9 }, () => [null, null]);

        highlightNextBoard();
    }, 100);
}


function highlightNextBoard() {
    let highlightIndex;

    if (currentBoard == -1 || wonBoards[currentBoard][0] !== null) {
        let availableBoards = Array.from({ length: 9 }, (_, index) => index).filter(board => wonBoards[board][0] === null);
        highlightIndex = availableBoards[Math.floor(Math.random() * availableBoards.length)];
        currentBoard = highlightIndex;
    } else {
        highlightIndex = currentBoard;
    }

    for (let i = 0; i < 9; i++) {
        if (highlightIndex === -1 || highlightIndex === i) {
            document.querySelector(`#box${i + 1}`).classList.add("yellow-bord");
        } else {
            document.querySelector(`#box${i + 1}`).classList.remove("yellow-bord");
        }
    }
}

highlightNextBoard();
