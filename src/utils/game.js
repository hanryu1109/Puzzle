function Game(optState) {
  this.state = optState || "012345678";
}

Game.Actions = {
  UP: "up",
  DOWN: "down",
  LEFT: "left",
  RIGHT: "right",
};

Game.DesiredState = "123456780";

Game.prototype.getAvaliableActionsAndStates = function () {
  const result = {};

  const zeroIndex = this.state.indexOf("0");
  const row = Math.floor(zeroIndex / 3);
  const column = zeroIndex % 3;

  if (column > 0)
    result[Game.Actions.LEFT] = this.getNextState(Game.Actions.LEFT);
  if (column < 2)
    result[Game.Actions.RIGHT] = this.getNextState(Game.Actions.RIGHT);
  if (row > 0) result[Game.Actions.UP] = this.getNextState(Game.Actions.UP);
  if (row < 2) result[Game.Actions.DOWN] = this.getNextState(Game.Actions.DOWN);

  return result;
};

Game.prototype.getNextState = function (action) {
  const zeroIndex = this.state.indexOf("0");
  let newIndex;

  switch (action) {
    case Game.Actions.LEFT:
      newIndex = zeroIndex - 1;
      break;
    case Game.Actions.RIGHT:
      newIndex = zeroIndex + 1;
      break;
    case Game.Actions.UP:
      newIndex = zeroIndex - 3;
      break;
    case Game.Actions.DOWN:
      newIndex = zeroIndex + 3;
      break;
    default:
      throw new Error("Unexpected action");
  }

  const stateArr = this.state.split("");
  stateArr[zeroIndex] = stateArr[newIndex];
  stateArr[newIndex] = "0";
  return stateArr.join("");
};

Game.prototype.isFinished = function () {
  return this.state === Game.DesiredState;
};

Game.prototype.randomize = function () {
  const that = this;
  const states = {};

  const iteration = 100;

  this.state = Game.DesiredState;
  states[this.state] = true;

  const randomNextState = function () {
    const state = _.sample(that.getAvaliableActionsAndStates());

    if (states[state]) return randomNextState();

    return state;
  };

  _.times(iteration, function () {
    that.state = randomNextState();
  });
};

Game.prototype.getManhattanDistance = function () {
  let distance = 0;

  const oneIndex = this.state.indexOf("1");
  const onePosition = Game.indexToRowColumn(oneIndex);
  distance += Math.abs(0 - onePosition.row) + Math.abs(0 - onePosition.column);

  const twoIndex = this.state.indexOf("2");
  const twoPosition = Game.indexToRowColumn(twoIndex);
  distance += Math.abs(0 - twoPosition.row) + Math.abs(1 - twoPosition.column);

  const threeIndex = this.state.indexOf("3");
  const threePosition = Game.indexToRowColumn(threeIndex);
  distance +=
    Math.abs(0 - threePosition.row) + Math.abs(2 - threePosition.column);

  const fourIndex = this.state.indexOf("4");
  const fourPosition = Game.indexToRowColumn(fourIndex);
  distance +=
    Math.abs(1 - fourPosition.row) + Math.abs(0 - fourPosition.column);

  const fiveIndex = this.state.indexOf("5");
  const fivePosition = Game.indexToRowColumn(fiveIndex);
  distance +=
    Math.abs(1 - fivePosition.row) + Math.abs(1 - fivePosition.column);

  const sixIndex = this.state.indexOf("6");
  const sixPosition = Game.indexToRowColumn(sixIndex);
  distance += Math.abs(1 - sixPosition.row) + Math.abs(2 - sixPosition.column);

  const sevenIndex = this.state.indexOf("7");
  const sevenPosition = Game.indexToRowColumn(sevenIndex);
  distance +=
    Math.abs(2 - sevenPosition.row) + Math.abs(0 - sevenPosition.column);

  const eightIndex = this.state.indexOf("8");
  const eightPosition = Game.indexToRowColumn(eightIndex);
  distance +=
    Math.abs(2 - eightPosition.row) + Math.abs(1 - eightPosition.column);

  return distance;
};

Game.indexToRowColumn = function (index) {
  return {
    row: Math.floor(index / 3),
    column: index % 3,
  };
};

export default Game;
