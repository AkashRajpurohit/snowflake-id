import { describe, it, expect } from 'vitest';

import { waitUntilNextTimestamp } from '~/helpers';

describe('helpers', () => {
  describe('waitUntilNextTimestamp', () => {
    it('should return a timestamp greater than the current timestamp', () => {
      const currentTimestamp = Date.now();
      const nextTimestamp = waitUntilNextTimestamp(currentTimestamp);

      expect(nextTimestamp).toBeGreaterThan(currentTimestamp);
    });

    it('should return a timestamp that is at least 1ms greater than the current timestamp', () => {
      const currentTimestamp = Date.now();
      const nextTimestamp = waitUntilNextTimestamp(currentTimestamp);

      expect(nextTimestamp - currentTimestamp).toBeGreaterThanOrEqual(1);
    });
  });
});
