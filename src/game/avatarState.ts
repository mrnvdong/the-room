// Shared mutable reference to local avatar position & movement for multi-visitor presence
export const localAvatarState = {
  position: [0, 0, 4.5] as [number, number, number],
  rotationY: 0,
  isMoving: false,
  isRunning: false,
};
