export const waitUntilNextTimestamp = (currentTimestamp: number) => {
  let nextTimestamp = Date.now();
  while (nextTimestamp <= currentTimestamp) {
    nextTimestamp = Date.now();
  }
  return nextTimestamp;
};

export const DEFAULTS = {
  WORKER_ID: 0,
  EPOCH: 1597017600000, // August 10, 2020 at 00:00:00 UTC
};

export const CONFIG = {
  TIMESTAMP_BITS: 42,
  WORKER_ID_BITS: 10,
  SEQUENCE_BITS: 12,
};
