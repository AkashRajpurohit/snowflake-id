import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { DEFAULTS } from '~/helpers';

import SnowflakeId from '~/snowflake';

describe('snowflake', () => {
  describe('Invalid input parameters check', () => {
    beforeEach(() => {
      // tell vitest we use mocked time
      vi.useFakeTimers();
    });

    afterEach(() => {
      // restoring date after each test run
      vi.useRealTimers();
    });

    it('should use default workerId if invalid workedId is passed', () => {
      const logSpy = vi.spyOn(global.console, 'warn');

      SnowflakeId({
        workerId: NaN,
      });

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toBeCalledWith(`Invalid worker ID provided: NaN, using default ID: ${DEFAULTS.WORKER_ID}`);
    });

    it('should use default NODE_ID_BITS if invalid nodeIdBits is passed', () => {
      const logSpy = vi.spyOn(global.console, 'warn');

      SnowflakeId({
        workerId: 121,
        nodeIdBits: NaN,
      });

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toBeCalledWith(
        `Invalid node ID bits provided: NaN, using default value: ${DEFAULTS.NODE_ID_BITS}`
      );
    });

    it('should use default NODE_ID_BITS if nodeIdBits provided is not in the range', () => {
      const logSpy = vi.spyOn(global.console, 'warn');

      SnowflakeId({
        workerId: 121,
        nodeIdBits: 35,
      });

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toBeCalledWith(`Invalid node ID bits provided: 35, using default value: ${DEFAULTS.NODE_ID_BITS}`);
    });

    it('should use default SEQUENCE_BITS if invalid sequenceBits is passed', () => {
      const logSpy = vi.spyOn(global.console, 'warn');

      SnowflakeId({
        workerId: 121,
        sequenceBits: NaN,
      });

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toBeCalledWith(
        `Invalid sequence bits provided: NaN, using default value: ${DEFAULTS.SEQUENCE_BITS}`
      );
    });

    it('should use default SEQUENCE_BITS if sequenceBits provided is not in the range', () => {
      const logSpy = vi.spyOn(global.console, 'warn');

      SnowflakeId({
        workerId: 121,
        sequenceBits: 35,
      });

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toBeCalledWith(
        `Invalid sequence bits provided: 35, using default value: ${DEFAULTS.SEQUENCE_BITS}`
      );
    });

    it('should use default EPOCH if invalid epoch is passed', () => {
      const logSpy = vi.spyOn(global.console, 'warn');

      SnowflakeId({
        workerId: 121,
        epoch: NaN,
      });

      expect(logSpy).toHaveBeenCalled();
      expect(logSpy).toBeCalledWith(`Invalid epoch provided: NaN, using default value: ${DEFAULTS.EPOCH}`);
    });

    it('should throw error if currentTimeStamp is less than lastTimeStamp', () => {
      let error: Error | null = null;
      try {
        const snowflakeId = SnowflakeId({
          workerId: 121,
        });

        // Setup first time so lastTimestamp is calculated in function closure
        snowflakeId.generate();

        const dateBeforeNow = new Date(Date.now() - 10000); // 10 second behind
        vi.setSystemTime(dateBeforeNow);

        snowflakeId.generate();
      } catch (err) {
        error = err as Error;
      }

      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toEqual('Clock is moving backwards!');
    });
  });

  describe('Valid scenarios', () => {
    const snowflakeId = SnowflakeId({
      workerId: 121,
    });

    it('should generate a new id', () => {
      const id = snowflakeId.generate();

      expect(id).toBeTypeOf('string');
    });

    it('should not generate same id ever', () => {
      const ids = new Set();
      const maxIds = 10000;

      for (let i = 0; i < maxIds; ++i) {
        const id = snowflakeId.generate();
        ids.add(id);
      }

      expect(ids.size).toEqual(maxIds);
    });
  });
});
