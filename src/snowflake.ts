import { DEFAULTS, getValidNodeId, waitUntilNextTimestamp } from './helpers';

const SnowflakeId = ({
  workerId = DEFAULTS.WORKER_ID,
  nodeIdBits = DEFAULTS.NODE_ID_BITS,
  sequenceBits = DEFAULTS.SEQUENCE_BITS,
  epoch = DEFAULTS.EPOCH,
}) => {
  if (typeof workerId !== 'number' || Number.isNaN(workerId)) {
    console.warn(
      `Invalid worker ID provided: ${workerId}, using default ID: ${DEFAULTS.WORKER_ID}`,
    );
    workerId = DEFAULTS.WORKER_ID;
  }

  if (
    typeof nodeIdBits !== 'number' ||
    Number.isNaN(nodeIdBits) ||
    nodeIdBits < 1 ||
    nodeIdBits > 31
  ) {
    console.warn(
      `Invalid node ID bits provided: ${nodeIdBits}, using default value: ${DEFAULTS.NODE_ID_BITS}`,
    );
    nodeIdBits = DEFAULTS.NODE_ID_BITS;
  }

  if (
    typeof sequenceBits !== 'number' ||
    Number.isNaN(sequenceBits) ||
    sequenceBits < 1 ||
    sequenceBits > 22
  ) {
    console.warn(
      `Invalid sequence bits provided: ${sequenceBits}, using default value: ${DEFAULTS.SEQUENCE_BITS}`,
    );
    sequenceBits = DEFAULTS.SEQUENCE_BITS;
  }

  if (typeof epoch !== 'number' || Number.isNaN(epoch)) {
    console.warn(
      `Invalid epoch provided: ${epoch}, using default value: ${DEFAULTS.EPOCH}`,
    );
    epoch = DEFAULTS.EPOCH;
  }

  let lastTimestamp = -1;
  let sequence = 0;
  let nodeId = getValidNodeId(workerId, nodeIdBits);
  const maxSequence = (1 << sequenceBits) - 1;

  function generate() {
    let timestamp = Date.now();

    if (timestamp < lastTimestamp) {
      throw new Error('Clock is moving backwards!');
    }

    if (timestamp === lastTimestamp) {
      sequence = (sequence + 1) & maxSequence;
      if (sequence === 0) {
        timestamp = waitUntilNextTimestamp(timestamp);
      }
    } else {
      sequence = 0;
    }

    lastTimestamp = timestamp;
    let high =
      (BigInt(timestamp - epoch) << BigInt(nodeIdBits + sequenceBits)) |
      (BigInt(nodeId) << BigInt(sequenceBits)) |
      BigInt(sequence);
    let low = BigInt(0);
    let snowflakeId = (high << BigInt(32)) | low;
    return snowflakeId.toString();
  }

  return {
    generate,
  };
};

export default SnowflakeId;
