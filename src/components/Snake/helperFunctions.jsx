const arrowKeys = { left: 37, up: 38, right: 39, down: 40 };
const { left, up, right, down } = arrowKeys;

const checkValidMove = (move, snakeHead, snakeBody) => {
  if (snakeBody === undefined) {
    return false
  }
  switch (move) {
    case 65:
    case left:
      if (snakeHead.y - snakeBody.y !== 0) {
        return true;
      } else {
        return false;
      }
    case 68:
    case right:
      if (snakeHead.y - snakeBody.y !== 0) {
        return true;
      } else {
        return false;
      }
    case 87:
    case up:
      if (snakeHead.x - snakeBody.x !== 0) {
        return true;
      } else {
        return false;
      }
    case 83:
    case down:
      if (snakeHead.x - snakeBody.x !== 0) {
        return true;
      } else {
        return false;
      }
    default:
      return false;
  }
};

const createCoords = move => {
  switch (move) {
    case 65:
    case left:
      return { x: -1, y: 0 };
    case 68:
    case right:
      return { x: 1, y: 0 };
    case 87:
    case up:
      return { x: 0, y: 1 };
    case 83:
    case down:
      return { x: 0, y: -1 };
    default:
      break;
  }
};

const checkReflect = snakeHead => {
  let { x, y } = snakeHead;
  if (x < 0) {
    snakeHead.x = 19;
  } else if (x > 19) {
    snakeHead.x = 0;
  } else if (y < 0) {
    snakeHead.y = 19;
  } else if (y > 19) {
    snakeHead.y = 0;
  }
};

const objectEqual = (object1, object2) => {
  return JSON.stringify(object1) === JSON.stringify(object2);
};

const appleGen = snakeArray => {
  const applePos = () => {
    return {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20)
    };
  };
  let newApplePos = applePos();
  while (snakeArray.some(snakePos => objectEqual(snakePos, newApplePos))) {
    newApplePos = applePos();
  }
  return newApplePos;
};

const calcSnakeHead = (currentPos, helperCoords) => {
  return {
    x: currentPos.x + helperCoords.x,
    y: currentPos.y - helperCoords.y
  };
};

export {
  checkValidMove,
  createCoords,
  checkReflect,
  objectEqual,
  appleGen,
  calcSnakeHead
};
