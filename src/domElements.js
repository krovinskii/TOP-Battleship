export const elements = {
  //-----------------Switch Screens----------------//
  playGameBtn: document.getElementById("playGameBtn"),
  startPageContainer: document.getElementById("startPageContainer"),
  gameContainer: document.getElementById("gameContainer"),
  //-----------------------------------------------//
  //-----------------Show instructions-------------//
  instructionsBtn: document.getElementById("instructionsBtn"),
  instructionsModal: document.getElementById("instructionsModal"),
  instructionsExitBtn: document.getElementById("modalExitBtn"),
  //-----------------------------------------------//
  //-----------------Player Form-------------------//
  player1Name: document.getElementById("player1Name").value.trim(),
  player2Name: document.getElementById("player2Name").value.trim(),
  player2HumanCheck: document.getElementById("player2Human").checked,
  player2AICheck: document.getElementById("player2AI").checked,
  //-----------------------------------------------//
  //-----------------Misc--------------------------//
  btnDiv: document.getElementById("btns"),
  //-----------------------------------------------//
  //-----------------Game Screen-------------------//
  player1NameGameScreen: document.getElementById("player1NameGameScreen"),
  player2NameGameScreen: document.getElementById("player2NameGameScreen"),
  player1GridTarget: document.getElementById("playerBoard"),
  player2GridTarget: document.getElementById("secondBoard"),
  player1TurnText: document.getElementById("playerTurnText"),
  player2TurnText: document.getElementById("secondPlayerTurnText"),
};
