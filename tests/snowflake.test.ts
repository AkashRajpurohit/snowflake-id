import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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

    it('should throw error if epoch is greater than current timestamp', () => {
      let error: Error | null = null;
      try {
        SnowflakeId({
          workerId: 121,
          epoch: Date.now() + 10000,
        });
      } catch (err) {
        error = err as Error;
      }

      expect(error).toBeInstanceOf(Error);
      expect(error?.message).toEqual(
        `Invalid epoch: ${Date.now() + 10000}, it can't be greater than the current timestamp!`
      );
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

    it('should generate a new valid snowflake id', () => {
      const id = snowflakeId.generate();

      expect(id).toBeTypeOf('string');

      // Generated id should be at max 64 bits
      // We can padStart with 0 for the binary representation
      const idBinary = BigInt(id).toString(2);
      expect(idBinary.length).toBeLessThanOrEqual(64);
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
