import { CONFIG, DEFAULTS, waitUntilNextTimestamp } from './helpers';

const SnowflakeId = ({ workerId = DEFAULTS.WORKER_ID, epoch = DEFAULTS.EPOCH } = {}) => {
  const currentTimestamp = Date.now();

  if (epoch > currentTimestamp) {
    throw new Error(`Invalid epoch: ${epoch}, it can't be greater than the current timestamp!`);
  }

  let lastTimestamp = -1;
  let sequence = 0;
  const maxSequence = (1 << CONFIG.SEQUENCE_BITS) - 1;

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

    const timestampOffset = timestamp - epoch;

    const timestampBits = timestampOffset.toString(2).padStart(CONFIG.TIMESTAMP_BITS, '0');
    const workerIdBits = workerId.toString(2).padStart(CONFIG.WORKER_ID_BITS, '0');
    const sequenceBits = sequence.toString(2).padStart(CONFIG.SEQUENCE_BITS, '0');

    const idBinary = `${timestampBits}${workerIdBits}${sequenceBits}`;
    const idDecimal = BigInt('0b' + idBinary).toString();

    return idDecimal.toString();
  }

  return {
    generate,
  };
};

export default SnowflakeId;
