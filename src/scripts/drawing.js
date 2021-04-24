import { DRAW_MODES, FLOOR_START, SQUARE_SIZE } from '../scripts/constants';
import EventDispatcher from '../modules/Events';

const emitter = EventDispatcher.getInstance();

const checkElevatorBounds = (x, y) => {
  // check if it's above the groud
  if (y < FLOOR_START && y > FLOOR_START - 40) {
    return true;
  } else {
    return false;
  }

  //check that there isn't already something there

  //check that you have enough money
}

export const draw = (scene, pointer, mode) => {
  let xPos = (parseInt (pointer.position.x / 16)) * 16;
  let yPos = (parseInt (pointer.position.y / 16)) * 16;

  if (mode === DRAW_MODES.SHAFT) {
    scene.add.image(xPos, yPos, 'shaft').setOrigin(0, 0);
  }

  if (mode === DRAW_MODES.ELEVATOR) {
    if (checkElevatorBounds(xPos, yPos)) {
      //drawing rules
      // x: -24 to center it - could probably do it through removing origin but I lke the consistency
      // y: always 128 as it has to be on ground level
      scene.add.image(xPos - 24, 128, 'elevator').setOrigin(0, 0);
    }
  }
}