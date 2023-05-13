import { describe, it, expect } from 'vitest';

import { getValidNodeId, waitUntilNextTimestamp } from '~/helpers';

describe('helpers', () => {
  describe('getValidNodeId', () => {
    it('should return 0 if an invalid nodeId is provided', () => {
      const nodeId = getValidNodeId(NaN, 10);

      expect(nodeId).toBe(0);
    });

    it('should return the same nodeId if a valid nodeId is provided', () => {
      const nodeId = getValidNodeId(512, 10);

      expect(nodeId).toBe(512);
    });

    it('should return a valid nodeId within the specified range', () => {
      const nodeId = getValidNodeId(2048, 10);

      expect(nodeId).toBeGreaterThanOrEqual(0);
      expect(nodeId).toBeLessThanOrEqual(2 ** 10);
    });

    it('should return a valid nodeId within the specified range for negative numbers', () => {
      const nodeId = getValidNodeId(-100, 10);

      expect(nodeId).toBeGreaterThanOrEqual(0);
      expect(nodeId).toBeLessThanOrEqual(2 ** 10);
    });
  });

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
