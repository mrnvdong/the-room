import { describe, it, expect } from 'vitest';
import {
  ROOM_BOUNDS,
  CHARACTER_RADIUS,
  INITIAL_COLLIDERS,
  checkCollision,
  resolveCollision,
  circleIntersectsAABB,
} from './collisionSystem';

describe('Collision System', () => {
  it('allows movement within open room space', () => {
    // Center of the room is open
    const isColliding = checkCollision(0, 0, CHARACTER_RADIUS, INITIAL_COLLIDERS);
    expect(isColliding).toBe(false);

    const [nextX, nextZ] = resolveCollision(0, 0, 0.1, 0.1, CHARACTER_RADIUS, INITIAL_COLLIDERS);
    expect(nextX).toBeCloseTo(0.1);
    expect(nextZ).toBeCloseTo(0.1);
  });

  it('prevents walking past room boundary walls', () => {
    // Attempting to move past left wall (minX = -7)
    const outsideLeft = checkCollision(
      ROOM_BOUNDS.minX - 0.1,
      0,
      CHARACTER_RADIUS,
      INITIAL_COLLIDERS
    );
    expect(outsideLeft).toBe(true);

    // Resolving position when pushing against left wall
    const currX = ROOM_BOUNDS.minX + CHARACTER_RADIUS + 0.05;
    const targetX = ROOM_BOUNDS.minX - 0.5;
    const [resolvedX, resolvedZ] = resolveCollision(
      currX,
      0,
      targetX,
      0,
      CHARACTER_RADIUS,
      INITIAL_COLLIDERS
    );
    expect(resolvedX).toBe(currX);
    expect(resolvedZ).toBe(0);
  });

  it('detects furniture collision and allows sliding', () => {
    // Desk collider is at [-6.2, 0, -4.8] to [-3.2, 1.2, -2.6]
    // Position inside desk
    const insideDesk = checkCollision(-4.5, -3.5, CHARACTER_RADIUS, INITIAL_COLLIDERS);
    expect(insideDesk).toBe(true);

    // Approaching desk from right (e.g. at x = -2.8, z = -3.5, inside Z range of desk)
    // Trying to move left to -3.5 (into desk) and along Z to -3.0 (still alongside desk)
    const currX = -2.8;
    const currZ = -3.5;
    const targetX = -3.5; // penetrates desk X [-6.2, -3.2]
    const targetZ = -3.0; // still within desk Z range [-4.8, -2.6]

    const [resolvedX, resolvedZ] = resolveCollision(
      currX,
      currZ,
      targetX,
      targetZ,
      CHARACTER_RADIUS,
      INITIAL_COLLIDERS
    );

    // It should stop X movement into the desk, but allow sliding along Z
    expect(resolvedX).toBe(currX);
    expect(resolvedZ).toBe(targetZ);
  });

  it('circleIntersectsAABB accurately calculates edge intersections', () => {
    const box = {
      id: 'test_box',
      min: [0, 0, 0] as [number, number, number],
      max: [2, 1, 2] as [number, number, number],
    };

    // Far away
    expect(circleIntersectsAABB(5, 5, 0.5, box)).toBe(false);

    // Right on edge within radius
    expect(circleIntersectsAABB(2.3, 1, 0.5, box)).toBe(true);

    // Beyond radius from edge
    expect(circleIntersectsAABB(2.6, 1, 0.5, box)).toBe(false);
  });

  it('recovers and depenetrates when starting inside an obstacle (e.g. standing up from chair)', () => {
    // Inside desk_chair collider [-5.2, 0, -2.5] to [-4.2, 1.3, -1.5]
    const currX = -4.7;
    const currZ = -2.0;

    // Moving toward open walkway along +Z (Z = -1.0)
    const targetX = -4.7;
    const targetZ = -1.0;

    const [, resolvedZ] = resolveCollision(
      currX,
      currZ,
      targetX,
      targetZ,
      CHARACTER_RADIUS,
      INITIAL_COLLIDERS
    );

    // Should successfully move out towards the open walkway, not be stuck at currZ (-2.0)
    expect(resolvedZ).toBeGreaterThan(-1.6);
  });
});
