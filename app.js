//creates the game state object
const gameState = {};
  
//populates the gameState object with starting info 
function buildInintialState() {
    gameState.board = [
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
        { value: null, isTurned: false},
    ];
    gameState.getCurrentPlayer = function () {
        return gameState.players[gameState.currentPlayerIdx];
    };
    gameState.players = ["", ""];
    gameState.currentPlayerIdx = 0;
    gameState.scores = [0, 0];
    gameState.lastTurnedIdx = -1;
};

//selectors
const boardElem = document.querySelector("#board");
const playerTurnElm = document.querySelector("#player-turn");
const scoreElm = document.querySelector('#score');

//game logic
function changeTurn() {
    gameState.currentPlayerIdx = gameState.currentPlayerIdx === 0 ? 1 : 0;
};

//renders

//renderState
function renderState() {
    boardElem.innerHTML = "";
    for (let i = 0; i < gameState.board.length; i++) {
        const card = gameState.board[i];
        const cardElem = document.createElement("div");
        cardElem.classList.add('space');
        if (card.isTurned) cardElem.innerHTML = card.value;
        cardElem.dataset.index = i;
        boardElem.appendChild(cardElem);
    }
};
//renderPlayer
function renderPlayer() {
    let text;
    if (!gameState.players[0] || !gameState.players[1]) {
        text = `
        <input name="player1" placeholder="Enter Player 1">
        <input name="player2" placeholder="Enter Player 2">
        <button class="start">Start Game</button>
        `;
    } else {
        text = `It's currently <span class="player">${gameState.getCurrentPlayer()}</span>'s turn`;
    }
    playerTurnElm.innerHTML = text;
};
//renderScore
function renderScore() {
    scoreElm.innerHTML = `
    <div>${gameState.players[0]}: ${gameState.scores[0]}</div>
    <div>${gameState.players[1]}: ${gameState.scores[1]}</div> 
    `;
};
//renderAll
function render() {
    renderState();
    renderPlayer();
    renderScore();
};


//click
function takeTurn(cardIdx) {
    if (!gameState.currentPlayer[0] || !gameState.currentPlayer[1]) {
        return;
    };
    const card = gameState.board[cardIdx]; 
    if (card.isTurned) {
        return;
    };
    card.isTurned = true;
    const lastTurnedCard = gameState.board[gameState.lastTurnedIdx] || {};
    if (lastTurnedCard.value === card.value) {
        gameState.scores[state.currentPlayer]++
        gameState.lastTurnedIdx = -1;

    } else if (lastTurnedCard.isTurned) {
        changeTurn();
    } else {
        gameState.lastTurnedIdx = index;
    }
    render();
};

//listeners
boardElem.addEventListener('click', function (event) {
    if (event.target.className !== 'space') {
        return;
    };
    const cardIdx = event.target.dataset.index;
    takeTurn(cardIdx);
    render();
});


playerTurnElm.addEventListener ("click", function(event) {
    if (event.target.className === "start") {
        const player1Input = document.querySelector("input[name=player1]");
        const player1Value = player1Input.value;
        gameState.players[0] = player1Value;
        const player2Input = document.querySelector("input[name=player2]");
        const player2Value = player2Input.value;
        gameState.players[1] = player2Value;
        render();
    } 
});

buildInintialState();
render();