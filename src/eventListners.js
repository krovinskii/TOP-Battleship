// In listener.js
import { elements } from "./domElements";
import { validate } from "./validation";
import { addElement } from "./domManipulation";
import { textManipulation } from "./domManipulation";
import { initGame, clickAttack, gameHelpers } from "./gameLogic";
import { place } from "./domManipulation";

export const listener = {
  init: () => {
    window.addEventListener("load", () => {
      listener.switchToGame();
      listener.showInstructions();
      listener.closeInstructions();
    });
  },

  switchToGame: () => {
    //Switches screens to game
    elements.playGameBtn.addEventListener("click", () => {
      if (
        validate.checkForNames(player1Name.value, player2Name.value) === false
      ) {
        addElement.errorDiv(
          elements.startPageContainer,
          elements.btnDiv,
          "Please enter names in both player boxes"
        );
        return;
      }

      if (
        !validate.checkPlayer2Checkbox(
          document.getElementById("player2Human"),
          document.getElementById("player2AI")
        )
      ) {
        addElement.errorDiv(
          elements.startPageContainer,
          elements.btnDiv,
          "Please check a box for player 2"
        );
        return;
      }

      console.log(player1Name.value);
      textManipulation.changeText(player1NameGameScreen, player1Name.value);
      textManipulation.changeText(player2NameGameScreen, player2Name.value);
      elements.startPageContainer.style.display = "none";
      elements.gameContainer.style.display = "flex";

      // Create the grids
      addElement.addGrid(100, elements.player1GridTarget);
      addElement.addGrid(100, elements.player2GridTarget);

      //Change Player Turn Text to First Player
      /*elements.player1TurnText.style.display = "block";
      textManipulation.changeText(
        elements.player1TurnText,
        `${player1Name.value}'s turn!`
      );*/

      // Get player 2 type (human or AI)
      const player2Type = document.getElementById("player2AI").checked
        ? "ai"
        : "human";

      // Initialize game and place ships AFTER grids are created
      const game = initGame("human", player2Type);
      place.ships(game.player1Board, game.player2Board);

      // Set up attack event listeners
      listener.setupAttackListeners(game);

      console.log("Game initialized and ships placed on board");
    });
  },

  showInstructions: () => {
    //Shows instructions on start screen
    elements.instructionsBtn.addEventListener("click", () => {
      elements.instructionsModal.showModal();
    });
  },

  closeInstructions: () => {
    //Closes instructions
    elements.instructionsExitBtn.addEventListener("click", () => {
      elements.instructionsModal.close();
    });
  },

  setupAttackListeners: (game) => {
    // Get all cells in player 2's grid (for player 1 to attack)
    const player2Grid = elements.player2GridTarget;
    const player2Cells = player2Grid.querySelectorAll(".gridCell");

    // Set up click handlers for each cell in player 2's grid
    player2Cells.forEach((cell) => {
      cell.addEventListener(
        "click",
        clickAttack(game.player1Board, game.player2Board)
      );
    });

    // If player 2 is human, set up event listeners for player 1's grid
    if (document.getElementById("player2Human").checked) {
      const player1Grid = elements.player1GridTarget;
      const player1Cells = player1Grid.querySelectorAll(".gridCell");

      // Initially disable these - they'll be enabled when it's player 2's turn
      player1Cells.forEach((cell) => {
        cell.style.pointerEvents = "none";
        cell.addEventListener(
          "click",
          clickAttack(game.player2Board, game.player1Board)
        );
      });

      // We'd need additional logic to enable/disable grids based on whose turn it is
    } else if (document.getElementById("player2AI").checked) {
      // If player 2 is AI, we need to disable interaction with player 1's grid
      const player1Grid = elements.player1GridTarget;
      const player1Cells = player1Grid.querySelectorAll(".gridCell");
      player1Cells.forEach((cell) => {
        cell.style.pointerEvents = "none";
      });
    }
  },
};
