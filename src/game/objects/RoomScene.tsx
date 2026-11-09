import React, { useRef } from 'react';
import { RoomShell } from './RoomShell';
import { DeskSet } from './DeskSet';
import { Bookshelf } from './Bookshelf';
import { LoungeArea } from './LoungeArea';
import { ServerRack } from './ServerRack';
import { WindowArea } from './WindowArea';
import { ProjectWall } from './ProjectWall';
import { Avatar } from '../characters/Avatar';
import { RemotePlayersContainer } from '../characters/RemotePlayersContainer';
import { FollowCamera } from '../camera/FollowCamera';
import { RoomLighting } from '../environment/RoomLighting';
import { KeyboardController } from '../controls/KeyboardController';
import { InteractionManager } from '../interactions/InteractionManager';
import { ProximityIndicators } from '../interactions/ProximityIndicators';

export const RoomScene: React.FC = () => {
  // Avatar world position: starting at room entrance (X: 0, Y: 0, Z: 4.5)
  const avatarPositionRef = useRef<[number, number, number]>([0, 0, 4.5]);

  return (
    <>
      {/* Keyboard Controls Listener */}
      <KeyboardController />

      {/* Lighting */}
      <RoomLighting />

      {/* Room Architecture & Furniture Models */}
      <RoomShell />
      <DeskSet />
      <Bookshelf />
      <LoungeArea />
      <ServerRack />
      <WindowArea />
      <ProjectWall />

      {/* Remote Co-visitors Currently in the Room */}
      <RemotePlayersContainer />

      {/* Local Third-Person Player Character */}
      <Avatar positionRef={avatarPositionRef} />

      {/* Third-Person Follow Camera */}
      <FollowCamera targetPosition={avatarPositionRef} />

      {/* Proximity Interaction Engine */}
      <InteractionManager avatarPositionRef={avatarPositionRef} />
      <ProximityIndicators />
    </>
  );
};
