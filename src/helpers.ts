export const waitUntilNextTimestamp = (currentTimestamp: number) => {
  let nextTimestamp = Date.now();
  while (nextTimestamp <= currentTimestamp) {
    nextTimestamp = Date.now();
  }
  return nextTimestamp;
};

export const getValidNodeId = (newNodeId: number, NODE_ID_BITS: number) => {
  const maxNodeId = 1 << NODE_ID_BITS;
  let nodeId;

  if (typeof newNodeId !== 'number' || Number.isNaN(newNodeId)) {
    console.warn(`Invalid node ID provided: ${newNodeId}, using default ID: 0`);
    nodeId = 0;
  } else {
    nodeId = Math.floor(newNodeId) % maxNodeId;
    if (nodeId < 0) {
      nodeId = maxNodeId - Math.abs(nodeId);
    }
  }

  return nodeId;
};

export const DEFAULTS = {
  WORKER_ID: 0,
  NODE_ID_BITS: 12,
  SEQUENCE_BITS: 10,
  EPOCH: 1683982358000, // January 1, 1970 at 00:00:00 UTC
};
