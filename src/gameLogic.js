import { Player } from "./classes";
import { randomCoords } from "./randomizeXY";
import { Gameboard } from "./classes";
import { Ship } from "./classes";
import { shipArray } from "./shipSizes";
import { randomizeDirection } from "./randomizeXY";
import { attackDOM } from "./domManipulation";
import { elements } from "./domElements";

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
    // Check if it's the AI's turn - if so, don't allow player clicks
    if (
      currentPlayer !== currentGame.player1Board &&
      opponentPlayer.type === "ai"
    ) {
      console.log("Not your turn!");
      return false;
    }

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
      if (currentPlayer === currentGame.player1Board) {
        // Player 1 got a hit
        const currentHits = parseInt(
          elements.player1Hits.innerText.split(":")[1].trim() || "0"
        );
        elements.player1Hits.innerText = `Hits: ${currentHits + 1}`;
      } else {
        // Player 2 got a hit
        const currentHits = parseInt(
          elements.player2Hits.innerText.split(":")[1].trim() || "0"
        );
        elements.player2Hits.innerText = `Hits: ${currentHits + 1}`;
      }

      // If it's a hit, player gets another turn - don't change turn text
      return true;
    } else {
      // Miss - switch turns
      event.target.classList.add("miss-cell");
      event.target.style.backgroundColor = "#aaa";
      if (currentPlayer === currentGame.player1Board) {
        // Player 1 got a miss
        const currentMisses = parseInt(
          elements.player1Misses.innerText.split(":")[1].trim() || "0"
        );
        elements.player1Misses.innerText = `Misses: ${currentMisses + 1}`;
      } else {
        // Player 2 got a miss
        const currentMisses = parseInt(
          elements.player2Misses.innerText.split(":")[1].trim() || "0"
        );
        elements.player2Misses.innerText = `Misses: ${currentMisses + 1}`;
      }
      if (currentPlayer === currentGame.player1Board) {
        // Player 1 just missed, switch to Player 2/AI's turn
        elements.player1TurnText.style.display = "none";
        elements.player2TurnText.style.display = "block";
        elements.player2TurnText.innerText = `${elements.player2Name}'s turn!`;

        // Disable player board for interaction
        disablePlayerInteraction();

        if (opponentPlayer.type === "ai") {
          setTimeout(() => makeAIMove(opponentPlayer, currentPlayer), 1000);
        }
      } else {
        // Player 2/AI just missed, switch to Player 1's turn
        elements.player2TurnText.style.display = "none";
        elements.player1TurnText.style.display = "block";
        elements.player1TurnText.innerText = `${elements.player1Name}'s turn!`;

        // Enable player board for interaction
        enablePlayerInteraction();
      }

      return false;
    }
  };
};

const makeAIMove = (aiPlayer, humanPlayer) => {
  // Make sure we're visually showing it's the AI's turn
  elements.player1TurnText.style.display = "none";
  elements.player2TurnText.style.display = "block";
  elements.player2TurnText.innerText = `${elements.player2Name}'s turn!`;

  let validMove = false;
  let attempts = 0;
  const maxAttempts = 100;

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

        const currentHits = parseInt(
          elements.player2Hits.innerText.split(":")[1].trim() || "0"
        );
        elements.player2Hits.innerText = `Hits: ${currentHits + 1}`;
        // Hit successful - AI gets another turn
        setTimeout(() => makeAIMove(aiPlayer, humanPlayer), 1000);
      } else {
        // AI missed - switch to player's turn
        cellElement.classList.add("miss-cell");
        cellElement.style.backgroundColor = "#aaa";

        const currentMisses = parseInt(
          elements.player2Misses.innerText.split(":")[1].trim() || "0"
        );

        elements.player2Misses.innerText = `Misses: ${currentMisses + 1}`;
        elements.player2TurnText.style.display = "none";
        elements.player1TurnText.style.display = "block";
        elements.player1TurnText.innerText = `${elements.player1Name}'s turn!`;

        enablePlayerInteraction();
      }

      validMove = true;
    }
  }
};

function disablePlayerInteraction() {
  const opponentBoard = elements.player2GridTarget;
  if (opponentBoard) {
    opponentBoard.style.pointerEvents = "none";
  }
}

function enablePlayerInteraction() {
  const opponentBoard = elements.player2GridTarget;
  if (opponentBoard) {
    opponentBoard.style.pointerEvents = "auto";
  }
}
const disableAttacks = () => {
  const allCells = document.querySelectorAll(".gridCell");
  allCells.forEach((cell) => {
    cell.style.pointerEvents = "none";
  });
};

export const gameHelpers = {
  makeAIMove,
  disableAttacks,
  disablePlayerInteraction,
  enablePlayerInteraction,
};
