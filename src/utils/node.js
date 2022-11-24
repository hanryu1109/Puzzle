import _ from "lodash";
import Game from "./game";

function Node(optData) {
  const data = optData || {};

  this.state = data.state || "123456780";
  this.parent = data.parent || null;
  this.cost = data.cost || 0;
  this.depth = data.depth || 0;

  this.game = new Game(this.state);
}

Node.prototype.expand = function () {
  const that = this;
  const result = [];

  const avaliableActionsAndStates = this.game.getAvaliableActionsAndStates();

  _.forEach(avaliableActionsAndStates, function (state, action) {
    const childData = {
      state,
      parent: that,
      depth: that.depth + 1,
      cost: that.cost + 1,
    };

    result.push(new Node(childData));
  });

  return result;
};

export default Node;
