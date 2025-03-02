import { Player } from "./classes";
import { randomCoords } from "./randomizeXY";
import { Gameboard } from "./classes";
import { Ship } from "./classes";
import { shipArray } from "./shipSizes";
import { randomizeDirection } from "./randomizeXY";
export const initGame = (player1, player2) => {
  //Pass player1 and player2 in as a type for player class (player  / ai )

  const player1Board = new Player(player1);
  const player2Board = new Player(player2);
  //player 1 ships
  for (let i = 0; i < shipArray.length; i++) {
    player1Board.game.placeShip(
      shipArray[i].length,
      randomizeDirection(),
      randomCoords()
    );
  }
  //player 2 ships
  for (let i = 0; i < shipArray.length; i++) {
    player2Board.game.placeShip(
      shipArray[i].length,
      randomizeDirection(),
      randomCoords()
    );
  }
  return { player1Board, player2Board };
};
