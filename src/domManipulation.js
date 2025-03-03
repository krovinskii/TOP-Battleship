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
  addGrid: (cells, target) => {
    const gridSize = Math.sqrt(cells);

    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        const div = document.createElement("div");
        div.id = `${x},${y}`;
        div.className = "gridCell";
        target.appendChild(div);
      }
    }
  },
};
export const textManipulation = {
  changeText: (location, changeTo) => {
    location.innerText = changeTo;
  },
};
export const place = {
  ships: (player1, player2) => {
    const player1board = player1.game;

    player1board.shipLocations.forEach((shipData, key) => {
      const coords = key.split(",");

      const x = coords[0];
      const y = coords[1];

      let cellElement = document.getElementById(`${x},${y}`);

      if (cellElement) {
        cellElement.classList.add("ship-cell");
        cellElement.style.backgroundColor = "#555";

        cellElement.dataset.shipLength = shipData.length;

        if (shipData.timesHit > 0) {
          cellElement.classList.add("hit");
          cellElement.style.backgroundColor = "#f55";
        }

        if (shipData.sunk) {
          cellElement.classList.add("sunk");
          cellElement.style.backgroundColor = "#000";
        }
      } else {
        console.error(`Cell element for coordinates ${key} not found!`);

        console.log(`Tried to find element with ID: "${x},${y}"`);

        const allCells = document.querySelectorAll(".gridCell");
        console.log(`Total grid cells found: ${allCells.length}`);
        if (allCells.length > 0) {
          console.log(
            `First few cell IDs: ${allCells[0].id}, ${allCells[1].id}, ${allCells[2].id}`
          );
        }
      }
    });
  },
};
