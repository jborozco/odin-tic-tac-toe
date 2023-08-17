

//Module for initiating and controling the game 
const gameLogic = (() => {

    const startGame = () => {
        let p1container = document.getElementById("player1div");
        let p2container = document.getElementById("player2div");
        let buttonContainer = document.getElementById("btnContainer");

        buttonContainer.innerHTML = '<button type="button" id="startBtn" onclick="gameLogic.init()" form="message">Start</button>';
        const startBtn = document.getElementById("startBtn")

    }



    //init player 
    const PlayerFactory = (name, isHuman) => {
        let score = 0;
        let turn = true;
        return {
            name, isHuman, turn, score
        }
    }
    let player1 = PlayerFactory("Player 1", true);
    let player2 = PlayerFactory("Player 2", true);




    let initPlayers = () => {
        //give the chosen name to the player when game start
        const playerName1 = document.getElementById("player1Name").value;
        const playerName2 = document.getElementById("player2Name").value;
        if (playerName1 != "") { player1.name = playerName1 }
        if (playerName2 != "") { player2.name = playerName2 }

        //randomize which player start the game
        if (Math.random() < 0.5) {
            player1.turn = false;
            document.getElementById("announcement").innerText = `${player2.name} starts !`;
            player1.firstToPlay = false;
            player2.firstToPlay = true;

        }
        else {
            player2.turn = false;
            document.getElementById("announcement").innerText = `${player1.name} starts !`;
            player1.firstToPlay = true;
            player2.firstToPlay = false;
        }

    }

    let resetPlayer = () => {

        player1.firstToPlay = !player1.firstToPlay;
        player2.firstToPlay = !player2.firstToPlay;
        player1.turn = player1.firstToPlay;
        player2.turn = player2.firstToPlay;

        if (player1.firstToPlay) {
            document.getElementById("announcement").innerText = `${player1.name} starts !`;
        }
        else {
            document.getElementById("announcement").innerText = `${player2.name} starts !`;
        }

    }

    let toggleTurn = () => {
        player1.turn = !player1.turn;
        player2.turn = !player2.turn;
    }

    let gameBoard = [];
    //initialize a grid of 3x3 cells
    const init = () => {
        for (let i = 0; i < 9; i++) {
            let gameCell = cellObj(i);
            gameBoard.push(gameCell);
        }
        let buttonContainer = document.getElementById("btnContainer");
        buttonContainer.innerHTML = '';
        setTimeout(() => {
            buttonContainer.innerHTML = '<button type="button" id="startBtn" onclick="location.reload()" form="message">End game</button>';
        }, "2000");

        //launch game board animation
        document.getElementById("container").className = "on";

        initPlayers()
        render();
        checkCell();
    }

    const reset = () => {
        gameBoard = [];
        for (let i = 0; i < 9; i++) {
            let gameCell = cellObj(i);
            gameBoard.push(gameCell);
        }
        resetPlayer();
        render();


    }

    //Define cell properties
    const cellObj = (position) => {
        return {
            position: position,
            status: "empty",
        }
    }
    //Render cell with a checked logic
    const render = () => {
        const container = document.getElementById("container");
        const p1container = document.getElementById("player1div");
        const p2container = document.getElementById("player2div");
        container.innerHTML = "";

        //render board
        for (i = 0; i < gameBoard.length; i++) {
            if (gameBoard[i].status === "checkedX") { // 
                container.innerHTML += `<div class="cell checked-x"></div>`
            }
            else if (gameBoard[i].status === "checkedO") { // 
                container.innerHTML += `<div class="cell checked-o"></div>`
            }
            else {
                container.innerHTML += `<div class="cell empty"></div>`
            }
        }
        // render player
        p1container.innerHTML = `
        <div id="player1Announcement"></div>
        <div class="playerImg" ><img src="img/player1.svg"></div>
        <div class="playername">${player1.name}</div>
        <div id="player1score" class="playerscore">Victory count: ${player1.score}</div>
        <div id="score-counter1" class="score-counter"></div>
        `;

        p2container.innerHTML = `
        <div id="player2Announcement"></div>
        <div class="playerImg" ><img src="img/player2.svg"></div>
        <div class="playername">${player2.name}</div>
        <div id="player2score" class="playerscore">Victory count: ${player2.score}</div>
        <div id="score-counter2" class="score-counter"></div>
        `;

        //render score

        // const scoreCounter1 = document.getElementById("score-counter1");
        // const scoreCounter2 = document.getElementById("score-counter2");

        // for (let i = 0; i < player1.score; i++) {
        //     scoreCounter1.innerHTML += `<div class="point"></div>`
        // }
        // for (let j = 0; j < player2.score; j++) {
        //     scoreCounter2.innerHTML += `<div class="point"></div>`;
        // }

        //render turns
        if (player1.turn) {
            p1container.className = 'turnTrue';
            p2container.className = '';
            container.className = 'on xturn';
        }

        else if (player2.turn) {
            p1container.className = '';
            p2container.className = 'turnTrue';
            container.className = 'on oturn';
        }



    }

    const gameStatus = () => {

        //check if a line is equal
        if (gameBoard[0].status == gameBoard[1].status && gameBoard[1].status == gameBoard[2].status && gameBoard[2].status != "empty" ||
            gameBoard[3].status == gameBoard[4].status && gameBoard[4].status == gameBoard[5].status && gameBoard[5].status != "empty" ||
            gameBoard[6].status == gameBoard[7].status && gameBoard[7].status == gameBoard[8].status && gameBoard[8].status != "empty" ||
            gameBoard[0].status == gameBoard[3].status && gameBoard[3].status == gameBoard[6].status && gameBoard[6].status != "empty" ||
            gameBoard[1].status == gameBoard[4].status && gameBoard[4].status == gameBoard[7].status && gameBoard[7].status != "empty" ||
            gameBoard[2].status == gameBoard[5].status && gameBoard[5].status == gameBoard[8].status && gameBoard[8].status != "empty" ||
            gameBoard[0].status == gameBoard[4].status && gameBoard[4].status == gameBoard[8].status && gameBoard[8].status != "empty" ||
            gameBoard[2].status == gameBoard[4].status && gameBoard[4].status == gameBoard[6].status && gameBoard[6].status != "empty") {

            if (player1.turn) {
                document.getElementById("announcement").innerText = player2.name + " won!";
                alert(player2.name + " won!");

                player2.score += 1;
                reset();
            }
            else if (player2.turn) {
                alert(player1.name + " won!");
                player1.score += 1;
                reset();
            }

        }
        else if (gameBoard[0].status != "empty" && gameBoard[1].status != "empty" && gameBoard[2].status != "empty" && gameBoard[3].status != "empty" && gameBoard[4].status != "empty" && gameBoard[5].status != "empty" && gameBoard[6].status != "empty" && gameBoard[7].status != "empty" && gameBoard[8].status != "empty") {
            alert("Draw!");
            reset();
        }

    }

    const checkCell = () => { // listen for a cell check and update the board
        var n = document.querySelectorAll('.cell');
        for (let e = 0; e < n.length; e++) {
            n[e].addEventListener('click', function () {
                document.getElementById("announcement").innerText = ``;

                if (gameBoard[e].status != "checkedX" && gameBoard[e].status != "checkedO") { //verify that the cell is not checked yet
                    if (player1.turn) {
                        gameBoard[e].status = "checkedX";

                    }
                    else if (player2.turn) {
                        gameBoard[e].status = "checkedO";
                    }
                    toggleTurn();
                    render();
                    gameStatus();
                    checkCell()
                }
            });

        }

    };

    return {
        startGame,
        init,
        checkCell

    }
})();


gameLogic.startGame();



