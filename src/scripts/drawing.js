import { DRAW_MODES, FLOOR_START, SQUARE_SIZE, ELEVATOR_SIZES } from '../scripts/constants';
import EventDispatcher from '../modules/Events';

const emitter = EventDispatcher.getInstance();

const checkElevatorBounds = (x, y) => {
  if (y < FLOOR_START && y > FLOOR_START - 40) {
    return true;
  } else {
    return false;
  }
}

const checkShaftBounds = (y) => {
  return y > 144;
}

const checkShaftPosition = (x, y, map) => {
  const currentMap = map.state[y - 1][x];
  let isMiddle = false; // we don't want shafts on the whole thing

  if (currentMap === 2) {
    isMiddle =  map.state[y - 1][x - 1] === 2 && map.state[y - 1][x + 1] === 2
  } else {
    isMiddle = true;
  }

  return (currentMap === 2 || currentMap === 3) && isMiddle;
}

const isSpaceEmpty = (x, y, map) => {
  return map.state[y][x] === 0;
}

export const draw = (scene, pointer, mode) => {
  let xPos = (parseInt (pointer.position.x / 16)) * 16;
  let yPos = (parseInt (pointer.position.y / 16)) * 16;

  if (mode === DRAW_MODES.SHAFT) {
    if (checkShaftBounds(yPos) && isSpaceEmpty(xPos / 16, yPos / 16, scene.map) && checkShaftPosition(xPos / 16, yPos / 16, scene.map)) {
      scene.add.image(xPos, yPos, 'shaft').setOrigin(0, 0);
      scene.map.updateMapRep(xPos / 16, yPos / 16, 3);
    } else {
      console.log("Need an ele buddy");
    }
  }

  if (mode === DRAW_MODES.ELEVATOR) {
    if (checkElevatorBounds(xPos, yPos) && isSpaceEmpty(xPos / 16, 128 / 16, scene.map)) {
      //drawing rules
      // x: -16 to center it - could probably do it through removing origin but I lke the consistency
      // y: always 128 as it has to be on ground level
      scene.add.image(xPos - 16, 128, 'elevator').setOrigin(0, 0);


      for (let x = - 1; x < ELEVATOR_SIZES.x - 1; x++) {
        for (let y = 0; y < ELEVATOR_SIZES.y; y++) {
          scene.map.updateMapRep(xPos / 16 + x, (128 / 16) + y, 2);
        }
      }
    } else {
      console.log("Space is not empty")
    }
  }
}