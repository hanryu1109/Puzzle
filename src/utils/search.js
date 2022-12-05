export default function search(optOptions) {
  const options = _.assign(
    {
      node: null,
      frontierList: [],
      expandedNodes: {},
      iteration: 0,
      iterationLimit: 1000,
      depthLimit: 0,
      callback: () => {},
      stepCallback: null,
      maxFrontierListLength: 0,
      maxExpandedNodesLength: 0,
      iterativeDeepeningIndex: 0,
    },
    optOptions || {}
  );

  if (options.node.game.isFinished()) {
    return options.callback(null, options);
  }

  const expandedList = options.node.expand();
  options.expandedNodes[options.node.state] = options.node;
  options.maxExpandedNodesLength = Math.max(
    options.maxExpandedNodesLength,
    _.size(options.expandedNodes)
  );

  const expandedUnexploredList = expandedList.filter(function (node) {
    if (options.depthLimit && node.depth > options.depthLimit) {
      return false;
    }

    const alreadyExpandedNode = options.expandedNodes[node.state];
    if (alreadyExpandedNode && alreadyExpandedNode.cost <= node.cost) {
      return false;
    }

    const alternativeNode = _.find(options.frontierList, { state: node.state });
    if (alternativeNode && alternativeNode.cost <= node.cost) {
      return false;
    } else if (alternativeNode && alternativeNode.cost > node.cost) {
      _.remove(options.frontierList, alternativeNode);
    }

    return true;
  });

  options.frontierList = options.frontierList.concat(expandedUnexploredList);
  options.maxFrontierListLength = Math.max(
    options.maxFrontierListLength,
    options.frontierList.length
  );

  const nextNode = getNextNode(options);
  if (!nextNode) {
    return options.callback(new Error("Frontier list is empty"), options);
  }

  options.iteration++;
  if (options.iterationLimit && options.iteration > options.iterationLimit) {
    return options.callback(new Error("Iteration limit reached"), options);
  }

  if (window.searchStopped) {
    window.searchStopped = false;
    return options.callback(new Error("Search stopped"), options);
  }

  if (options.stepCallback) {
    options.stepCallback(_.assign(options, { node: nextNode }));
  } else {
    setTimeout(function () {
      search(_.assign(options, { node: nextNode }));
    }, 0);
  }
}

function getNextNode(options) {
  const bestNode = _.minBy(options.frontierList, function (node) {
    return node.game.getManhattanDistance() + node.cost;
  });

  _.remove(options.frontierList, bestNode);

  return bestNode;
}
