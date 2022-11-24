const SearchType = {
  A_STAR: "aStar",
};

export default function search(optOptions) {
  const options = _.assign(
    {
      node: null,
      frontierList: [],
      expandedNodes: {},
      iteration: 0,
      iterationLimit: 1000,
      depthLimit: 0,
      expandCheckOptimization: false,
      callback: () => {},
      stepCallback: null,
      type: "aStar",
      maxFrontierListLength: 0,
      maxExpandedNodesLength: 0,
      iterativeDeepeningIndex: 0,
    },
    optOptions || {}
  );

  if (options.node.game.isFinished()) {
    return options.callback(null, options);
  }

  // Expand current node
  const expandedList = options.node.expand();
  options.expandedNodes[options.node.state] = options.node;
  options.maxExpandedNodesLength = Math.max(
    options.maxExpandedNodesLength,
    _.size(options.expandedNodes)
  );

  // Filter just-expanded nodes
  const expandedUnexploredList = expandedList.filter(function (node) {
    // Check depth
    if (options.depthLimit && node.depth > options.depthLimit) return false;

    // Check whether node is already expanded (with lower cost)
    const alreadyExpandedNode = options.expandedNodes[node.state];
    if (alreadyExpandedNode && alreadyExpandedNode.cost <= node.cost)
      return false;

    // Check whether there is a better alternative (lower-cost) in frontier list
    const alternativeNode = _.find(options.frontierList, { state: node.state });
    if (alternativeNode && alternativeNode.cost <= node.cost) return false;
    else if (alternativeNode && alternativeNode.cost > node.cost) {
      _.remove(options.frontierList, alternativeNode);
    }

    return true;
  });

  // Add filtered just-expanded nodes into frontier list
  options.frontierList = options.frontierList.concat(expandedUnexploredList);
  options.maxFrontierListLength = Math.max(
    options.maxFrontierListLength,
    options.frontierList.length
  );

  // Check whether desired state is in just-expanded list
  if (options.expandCheckOptimization) {
    const desiredNode = _.find(
      expandedUnexploredList,
      function (unexploredNode) {
        return unexploredNode.game.isFinished();
      }
    );

    if (desiredNode) {
      return options.callback(
        null,
        _.assign({}, options, { node: desiredNode })
      );
    }
  }

  // Next call
  const nextNode = getNextNode(options);
  if (!nextNode) {
    return options.callback(new Error("Frontier list is empty"), options);
  }

  // Iteration check
  options.iteration++;
  if (options.iterationLimit && options.iteration > options.iterationLimit) {
    console.log("check???", options.node.state);
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
