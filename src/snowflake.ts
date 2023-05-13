import { DEFAULTS, getValidNodeId, waitUntilNextTimestamp } from './helpers';

const SnowflakeId = ({
  workerId = DEFAULTS.WORKER_ID,
  NODE_ID_BITS = DEFAULTS.NODE_ID_BITS,
  SEQUENCE_BITS = DEFAULTS.SEQUENCE_BITS,
  EPOCH = DEFAULTS.EPOCH,
}) => {
  if (typeof workerId !== 'number' || Number.isNaN(workerId)) {
    console.warn(
      `Invalid worker ID provided: ${workerId}, using default ID: ${DEFAULTS.WORKER_ID}`,
    );
    workerId = DEFAULTS.WORKER_ID;
  }

  if (
    typeof NODE_ID_BITS !== 'number' ||
    Number.isNaN(NODE_ID_BITS) ||
    NODE_ID_BITS < 1 ||
    NODE_ID_BITS > 31
  ) {
    console.warn(
      `Invalid node ID bits provided: ${NODE_ID_BITS}, using default value: ${DEFAULTS.NODE_ID_BITS}`,
    );
    NODE_ID_BITS = DEFAULTS.NODE_ID_BITS;
  }

  if (
    typeof SEQUENCE_BITS !== 'number' ||
    Number.isNaN(SEQUENCE_BITS) ||
    SEQUENCE_BITS < 1 ||
    SEQUENCE_BITS > 22
  ) {
    console.warn(
      `Invalid sequence bits provided: ${SEQUENCE_BITS}, using default value: ${DEFAULTS.SEQUENCE_BITS}`,
    );
    SEQUENCE_BITS = DEFAULTS.SEQUENCE_BITS;
  }

  if (typeof EPOCH !== 'number' || Number.isNaN(EPOCH)) {
    console.warn(
      `Invalid epoch provided: ${EPOCH}, using default value: ${DEFAULTS.EPOCH}`,
    );
    EPOCH = DEFAULTS.EPOCH;
  }

  let lastTimestamp = -1;
  let sequence = 0;
  let nodeId = getValidNodeId(workerId, NODE_ID_BITS);
  const maxSequence = (1 << SEQUENCE_BITS) - 1;

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
      (BigInt(timestamp - EPOCH) << BigInt(NODE_ID_BITS + SEQUENCE_BITS)) |
      (BigInt(nodeId) << BigInt(SEQUENCE_BITS)) |
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
