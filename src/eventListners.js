import { elements } from "./domElements";
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
