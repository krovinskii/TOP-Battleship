import { Player } from "./classes";
import { randomCoords } from "./randomizeXY";
import { Gameboard } from "./classes";
import { Ship } from "./classes";
import { shipArray } from "./shipSizes";
import { randomizeDirection } from "./randomizeXY";
import { attackDOM } from "./domManipulation";

let currentGame = null;

export const initGame = (player1, player2) => {
  const player1Board = new Player(player1);
  const player2Board = new Player(player2);

  for (let i = 0; i < shipArray.length; i++) {
    player1Board.game.placeShip(
      shipArray[i].length,
      randomizeDirection(),
      randomCoords()
    );
  }

  for (let i = 0; i < shipArray.length; i++) {
    player2Board.game.placeShip(
      shipArray[i].length,
      randomizeDirection(),
      randomCoords()
    );
  }
  currentGame = { player1Board, player2Board };
  return currentGame;
};

export const clickAttack = (currentPlayer, opponentPlayer) => {
  return (event) => {
    const coords = event.target.id.split(",").map(Number);

    if (
      event.target.classList.contains("hit-cell") ||
      event.target.classList.contains("miss-cell")
    ) {
      return false;
    }

    const hitSuccessful = opponentPlayer.game.receiveAttack(coords);

    if (hitSuccessful) {
      event.target.classList.add("hit-cell");
      event.target.style.backgroundColor = "#f55";

      return true;
    } else {
      event.target.classList.add("miss-cell");
      event.target.style.backgroundColor = "#aaa";

      const player1Name = document.getElementById("player1Name");
      const player2Name = document.getElementById("player2Name");

      if (currentPlayer === currentGame.player1Board) {
        if (document.getElementById("player1TurnText")) {
          document.getElementById("player1TurnText").style.display = "none";
        }
        if (document.getElementById("player2TurnText")) {
          document.getElementById("player2TurnText").style.display = "block";
          document.getElementById(
            "player2TurnText"
          ).innerText = `${player2Name.value}'s turn!`;
        }

        if (opponentPlayer.type === "ai") {
          setTimeout(() => makeAIMove(opponentPlayer, currentPlayer), 1000);
        }
      } else {
        if (document.getElementById("player2TurnText")) {
          document.getElementById("player2TurnText").style.display = "none";
        }
        if (document.getElementById("player1TurnText")) {
          document.getElementById("player1TurnText").style.display = "block";
          document.getElementById(
            "player1TurnText"
          ).innerText = `${player1Name.value}'s turn!`;
        }
      }

      return false;
    }
  };
};

const makeAIMove = (aiPlayer, humanPlayer) => {
  let validMove = false;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loops

  while (!validMove && attempts < maxAttempts) {
    attempts++;
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const coordKey = `${x},${y}`;

    const cellElement = document.getElementById(coordKey);
    if (
      cellElement &&
      !cellElement.classList.contains("hit-cell") &&
      !cellElement.classList.contains("miss-cell")
    ) {
      const hitSuccessful = humanPlayer.game.receiveAttack([x, y]);

      if (hitSuccessful) {
        cellElement.classList.add("hit-cell");
        cellElement.style.backgroundColor = "#f55";

        setTimeout(() => makeAIMove(aiPlayer, humanPlayer), 1000);
      } else {
        cellElement.classList.add("miss-cell");
        cellElement.style.backgroundColor = "#aaa";

        if (document.getElementById("player2TurnText")) {
          document.getElementById("player2TurnText").style.display = "none";
        }
        if (document.getElementById("player1TurnText")) {
          document.getElementById("player1TurnText").style.display = "block";
          document.getElementById("player1TurnText").innerText = `${
            document.getElementById("player1Name").value
          }'s turn!`;
        }
      }

      validMove = true;
    }
  }
};

const disableAttacks = () => {
  const allCells = document.querySelectorAll(".gridCell");
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
};

export const gameHelpers = {
  makeAIMove,
  disableAttacks,
};
