export const addElement = {
  //Add div below buttons in start screen when user error
  errorDiv: (parent, childAfter, str) => {
    const existingErrorDiv = parent.querySelector(".errorDiv");

    if (existingErrorDiv) {
      existingErrorDiv.innerText = str;
    } else {
      const createdDiv = document.createElement("div");
      parent.insertBefore(createdDiv, childAfter);
      createdDiv.innerText = str;
      createdDiv.className = "errorDiv";
    }
  },
};
export const textManipulation = {
  changeText: (location, changeTo) => {
    location.innerText = changeTo;
    console.log(`location: ${location}`);
    console.log(`changeTo: ${changeTo}`);
  },
};
