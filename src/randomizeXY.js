//Randomizes [x. y]
export const randomCoords = () => {
  const randomX = Math.floor(Math.random() * 10);
  const randomY = Math.floor(Math.random() * 10);
  return [randomX, randomY];
};

export const randomizeDirection = () => {
  const randomNum = Math.floor(Math.random) * 10;
  if (randomNum >= 5) {
    return "horizontal";
  } else return "vertical";
};
