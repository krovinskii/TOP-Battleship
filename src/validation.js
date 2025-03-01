export const validate = {
  //Validate player names
  checkForNames: (name, secondName) => {
    if (typeof name !== "string") {
      console.log("Please enter a name.");
      return false;
    } else return true;
  },
  //Validate player 2 checkboxes
  checkPlayer2Checkbox: (box, secondBox) => {
    if (box.checked && secondBox.checked) {
      console.log("Only select one checkbox.");
      return false;
    }
    if (!box.checked && !secondBox.checked) {
      console.log("Select a checkbox for player 2");
      return false;
    }
    return true;
  },
};
