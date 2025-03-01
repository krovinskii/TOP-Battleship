import { elements } from "./domElements";
import { validate } from "./validation";
import { addElement } from "./domManipulation";
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
      elements.startPageContainer.style.display = "none";
      elements.gameContainer.style.display = "flex";
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
