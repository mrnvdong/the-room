import React, { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useInteractionStore } from '@/stores/useInteractionStore';
import { useInputStore } from '@/stores/useInputStore';
import { useRoomStateStore } from '@/stores/useRoomStateStore';
import { useExplorationStore, EXPLORATION_ZONES } from '@/stores/useExplorationStore';
import { soundManager } from '@/features/audio/soundManager';
import { InteractableObject } from '@/types';

interface InteractionManagerProps {
  avatarPositionRef: React.MutableRefObject<[number, number, number]>;
}

export const InteractionManager: React.FC<InteractionManagerProps> = ({ avatarPositionRef }) => {
  const setActiveNearObject = useInteractionStore((state) => state.setActiveNearObject);
  const activeNearObject = useInteractionStore((state) => state.activeNearObject);
  const openModal = useInteractionStore((state) => state.openModal);
  const activeModalObject = useInteractionStore((state) => state.activeModalObject);

  const isInteractingTriggered = useInputStore((state) => state.isInteractingTriggered);
  const clearInteractTrigger = useInputStore((state) => state.clearInteractTrigger);

  // Room State actions
  const toggleDeskLamp = useRoomStateStore((state) => state.toggleDeskLamp);
  const isSittingOnSofa = useRoomStateStore((state) => state.isSittingOnSofa);
  const setSittingOnSofa = useRoomStateStore((state) => state.setSittingOnSofa);

  // Complete List of Interactive Objects per spec/ROOM_INTERACTIONS.md
  const roomObjects: InteractableObject[] = useMemo(
    () => [
      {
        id: 'desk.main_monitor',
        displayName: 'Main Workstation (DONG-OS)',
        description: 'Explore About, Projects, Skills, Experience files, and secret apps.',
        position: [-4.9, 1.0, -3.8],
        radius: 1.8,
        action: 'open_desktop',
        category: 'desk',
      },
      {
        id: 'desk.keyboard',
        displayName: 'Mechanical Keyboard (Terminal CLI)',
        description: 'Open local demo terminal. Portfolio commands show placeholders, not verified owner facts.',
        position: [-4.9, 0.8, -3.5],
        radius: 1.6,
        action: 'open_terminal',
        category: 'desk',
      },
      {
        id: 'desk.secondary_monitor',
        displayName: 'Featured Projects Dashboard',
        description: 'View example project records. Repository links are not configured.',
        position: [-3.9, 1.0, -3.8],
        radius: 1.6,
        action: 'open_projects',
        category: 'desk',
      },
      {
        id: 'desk.phone',
        displayName: 'Personal Smartphone',
        description: 'Contact details have not been supplied. No message is sent from this demo.',
        position: [-3.8, 0.8, -3.5],
        radius: 1.5,
        action: 'open_contact',
        category: 'desk',
      },
      {
        id: 'desk.coffee',
        displayName: 'Dark Roast Coffee Mug',
        description: 'Take a sip for software engineering insights and daily developer quotes.',
        position: [-5.5, 0.8, -3.5],
        radius: 1.5,
        action: 'drink_coffee',
        category: 'desk',
      },
      {
        id: 'desk.lamp',
        displayName: 'Minimalist Desk Lamp',
        description: 'Toggle warm desk spotlight ON / OFF.',
        position: [-5.8, 1.0, -3.9],
        radius: 1.6,
        action: 'toggle_lamp',
        category: 'desk',
      },
      {
        id: 'secret.drawer',
        displayName: 'Keypad Lockbox Drawer',
        description: 'Local game puzzle only; the keypad is not a security feature.',
        position: [-3.7, 0.4, -3.7],
        radius: 1.6,
        action: 'unlock_drawer',
        category: 'desk',
      },
      {
        id: 'shelf.books',
        displayName: 'Technical Library Shelf',
        description: 'Read generic demo books on Web, Systems, Cloud, and AI.',
        position: [-0.2, 1.2, -4.7],
        radius: 2.2,
        action: 'read_books',
        category: 'books',
      },
      {
        id: 'server.rack',
        displayName: 'Edge Infrastructure & Telemetry',
        description: 'Inspect an illustrative topology. Metrics are examples, not live telemetry.',
        position: [4.7, 1.2, -4.0],
        radius: 2.2,
        action: 'inspect_servers',
        category: 'servers',
      },
      {
        id: 'wall.projects',
        displayName: 'Architectural Project Wall',
        description: 'Explore example project case studies. Claims are demo content, not verified owner work.',
        position: [5.5, 1.8, -2.0],
        radius: 2.5,
        action: 'view_wall_projects',
        category: 'projects',
      },
      {
        id: 'lounge.sofa',
        displayName: 'Lounge Sectional Sofa',
        description: 'Sit down, relax, and switch to cozy lounge view.',
        position: [4.5, 0.6, 2.2],
        radius: 2.2,
        action: 'relax_sofa',
        category: 'lounge',
      },
      {
        id: 'lounge.tv',
        displayName: 'Lounge Smart TV Display',
        description: 'A video is not configured yet; the panel explains this limitation.',
        position: [5.8, 1.6, 2.6],
        radius: 2.2,
        action: 'watch_tv',
        category: 'lounge',
      },
      {
        id: 'lounge.table',
        displayName: 'Coffee Table (Portfolio FAQ)',
        description: 'Browse demo FAQs about this local prototype and its current limitations.',
        position: [4.5, 0.6, 0.7],
        radius: 2.0,
        action: 'read_faq',
        category: 'lounge',
      },
      {
        id: 'window.view',
        displayName: 'Panoramic Skyline Window',
        description: 'Switch weather atmospheres (Day, Sunset, Rain, Night) and enter lookout mode.',
        position: [-5.8, 1.5, 0.0],
        radius: 2.5,
        action: 'look_window',
        category: 'window',
      },
      {
        id: 'entrance.door',
        displayName: 'Workspace Threshold & Exit',
        description: 'Return to entrance corridor, switch visitor identity, or sign guestbook.',
        position: [0, 1.2, 5.3],
        radius: 2.0,
        action: 'exit_door',
        category: 'exit',
      },
    ],
    []
  );

  const discoverZone = useExplorationStore((state) => state.discoverZone);

  // Proximity check on every frame with distance tie-breaking & Zone discovery
  useFrame(() => {
    const [ax, , az] = avatarPositionRef.current;

    // Check exploration zones
    for (const zone of EXPLORATION_ZONES) {
      const [zx, , zz] = zone.position;
      if (Math.hypot(ax - zx, az - zz) <= zone.radius) {
        discoverZone(zone.id);
      }
    }

    if (activeModalObject) return;
    let closestObj: InteractableObject | null = null;
    let minDistance = Infinity;

    for (const obj of roomObjects) {
      const [ox, , oz] = obj.position;
      const dist = Math.hypot(ax - ox, az - oz);

      if (dist <= obj.radius && dist < minDistance) {
        minDistance = dist;
        closestObj = obj;
      }
    }

    if (closestObj?.id !== activeNearObject?.id) {
      setActiveNearObject(closestObj);
    }
  });

  // Handle interaction trigger (from E key or mobile button)
  useEffect(() => {
    if (isInteractingTriggered) {
      clearInteractTrigger();
      if (activeNearObject && !activeModalObject) {
        if (activeNearObject.id === 'desk.lamp') {
          soundManager.playSwitchClick();
          toggleDeskLamp();
          return;
        }

        if (activeNearObject.id === 'lounge.sofa') {
          soundManager.playInteractBeep();
          setSittingOnSofa(!isSittingOnSofa);
          return;
        }

        soundManager.playInteractBeep();
        openModal(activeNearObject);
      }
    }
  }, [
    isInteractingTriggered,
    activeNearObject,
    activeModalObject,
    openModal,
    clearInteractTrigger,
    toggleDeskLamp,
    isSittingOnSofa,
    setSittingOnSofa,
  ]);

  return null;
};
