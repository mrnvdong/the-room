import { useEffect } from 'react';
import { useInputStore } from '@/stores/useInputStore';
import { useInteractionStore } from '@/stores/useInteractionStore';
import { useMultiplayerStore } from '@/stores/useMultiplayerStore';

export const KeyboardController: React.FC = () => {
  const setMoveVector = useInputStore((state) => state.setMoveVector);
  const setRunning = useInputStore((state) => state.setRunning);
  const triggerInteract = useInputStore((state) => state.triggerInteract);
  const activeModalObject = useInteractionStore((state) => state.activeModalObject);
  const closeModal = useInteractionStore((state) => state.closeModal);

  useEffect(() => {
    const keysPressed = new Set<string>();

    const updateMovement = () => {
      // If modal is active, suppress movement
      if (activeModalObject) {
        setMoveVector([0, 0]);
        return;
      }

      let x = 0;
      let z = 0;

      if (keysPressed.has('KeyW') || keysPressed.has('ArrowUp')) z -= 1;
      if (keysPressed.has('KeyS') || keysPressed.has('ArrowDown')) z += 1;
      if (keysPressed.has('KeyA') || keysPressed.has('ArrowLeft')) x -= 1;
      if (keysPressed.has('KeyD') || keysPressed.has('ArrowRight')) x += 1;

      // Normalize diagonal movement
      const len = Math.hypot(x, z);
      if (len > 0) {
        x /= len;
        z /= len;
      }

      setMoveVector([x, z]);
      setRunning(keysPressed.has('ShiftLeft') || keysPressed.has('ShiftRight'));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs/textareas
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'KeyE') {
        triggerInteract();
      }

      if (e.code === 'KeyF') {
        // Toggle Sit Down / Stand Up shortcut
        useMultiplayerStore.getState().toggleLocalSitting();
      }

      if (e.code === 'KeyB') {
        // Toggle Emotes & Actions Panel shortcut
        useMultiplayerStore.getState().toggleEmoteBarOpen();
      }

      if (e.code === 'Escape' && activeModalObject) {
        closeModal();
      }

      keysPressed.add(e.code);
      updateMovement();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.delete(e.code);
      updateMovement();
    };

    const handleBlur = () => {
      keysPressed.clear();
      setMoveVector([0, 0]);
      setRunning(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, [setMoveVector, setRunning, triggerInteract, activeModalObject, closeModal]);

  return null;
};
