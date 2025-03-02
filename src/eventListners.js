import { elements } from "./domElements";
import { validate } from "./validation";
import { addElement } from "./domManipulation";
import { textManipulation } from "./domManipulation";
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
      addElement.addGrid(100, elements.player1GridTarget);
      addElement.addGrid(100, elements.player2GridTarget);
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
};
