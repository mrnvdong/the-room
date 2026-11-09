import { BoundingBox3D } from '@/types';

// Room dimensions (Width: 14, Depth: 12, Height: 4.2)
export const ROOM_BOUNDS = {
  minX: -7.0,
  maxX: 7.0,
  minZ: -6.0,
  maxZ: 6.0,
  minY: 0,
  maxY: 4.2,
};

export const CHARACTER_RADIUS = 0.35;

// Initial static colliders for Phase 1 furniture
export const INITIAL_COLLIDERS: BoundingBox3D[] = [
  // Desk and dual monitor workstation (Front-left / mid-left area)
  {
    id: 'desk_main',
    min: [-6.2, 0, -4.8],
    max: [-3.2, 1.2, -2.6],
  },
  // Desk chair
  {
    id: 'desk_chair',
    min: [-5.2, 0, -2.5],
    max: [-4.2, 1.3, -1.5],
  },
  // Bookshelf (along back wall, centered-left)
  {
    id: 'bookshelf',
    min: [-2.2, 0, -5.8],
    max: [1.8, 3.2, -4.8],
  },
  // Server rack & monitoring desk (back-right corner)
  {
    id: 'server_corner',
    min: [4.4, 0, -5.6],
    max: [6.5, 2.8, -3.2],
  },
  // Lounge Sofa (front-right)
  {
    id: 'lounge_sofa',
    min: [2.8, 0, 1.6],
    max: [6.2, 1.0, 3.6],
  },
  // Lounge Coffee Table
  {
    id: 'coffee_table',
    min: [3.4, 0, 0.2],
    max: [5.6, 0.5, 1.2],
  },
];

/**
 * Check if a circle at (x, z) with radius r intersects with an AABB
 */
export function circleIntersectsAABB(
  x: number,
  z: number,
  radius: number,
  box: BoundingBox3D
): boolean {
  // Find closest point on AABB to circle center
  const closestX = Math.max(box.min[0], Math.min(x, box.max[0]));
  const closestZ = Math.max(box.min[2], Math.min(z, box.max[2]));

  // Calculate distance between circle's center and this closest point
  const distanceX = x - closestX;
  const distanceZ = z - closestZ;

  // If the distance is less than the circle's radius, an intersection occurs
  const distanceSquared = distanceX * distanceX + distanceZ * distanceZ;
  return distanceSquared < radius * radius;
}

/**
 * Check if a position collides with any collider in the list
 */
export function checkCollision(
  x: number,
  z: number,
  radius: number,
  colliders: BoundingBox3D[] = INITIAL_COLLIDERS
): boolean {
  // Room boundary check
  if (
    x - radius < ROOM_BOUNDS.minX ||
    x + radius > ROOM_BOUNDS.maxX ||
    z - radius < ROOM_BOUNDS.minZ ||
    z + radius > ROOM_BOUNDS.maxZ
  ) {
    return true;
  }

  // Obstacle checks
  for (const box of colliders) {
    if (circleIntersectsAABB(x, z, radius, box)) {
      return true;
    }
  }

  return false;
}

/**
 * Calculates a collision-free next position using axis-sliding physics.
 * If moving directly to (targetX, targetZ) hits an obstacle, it tries moving
 * along only X or only Z, enabling smooth sliding alongside walls and furniture.
 */
export function resolveCollision(
  currX: number,
  currZ: number,
  targetX: number,
  targetZ: number,
  radius: number = CHARACTER_RADIUS,
  colliders: BoundingBox3D[] = INITIAL_COLLIDERS
): [number, number] {
  // 1. Try full movement
  if (!checkCollision(targetX, targetZ, radius, colliders)) {
    return [targetX, targetZ];
  }

  // 2. Try sliding along X axis only
  const canMoveX = !checkCollision(targetX, currZ, radius, colliders);

  // 3. Try sliding along Z axis only
  const canMoveZ = !checkCollision(currX, targetZ, radius, colliders);

  if (canMoveX && !canMoveZ) {
    return [targetX, currZ];
  }
  if (!canMoveX && canMoveZ) {
    return [currX, targetZ];
  }
  if (canMoveX && canMoveZ) {
    // Both independent directions are valid; choose the one with greater progress
    const distSqX = (targetX - currX) ** 2;
    const distSqZ = (targetZ - currZ) ** 2;
    return distSqX >= distSqZ ? [targetX, currZ] : [currX, targetZ];
  }

  // If both blocked, stay in place
  return [currX, currZ];
}
