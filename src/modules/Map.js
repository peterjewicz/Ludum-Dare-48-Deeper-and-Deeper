
export default class Map {
  constructor(size, single) { // assuming square for now
    this.state = this.generateMap(size, single)
  }

  generateMap(size, single) {
    let mapRep = []

    for (let x = 0; x < size / single; x++) {
      mapRep[x] = []
      for (let y = 0; y < size / single; y++) {
        mapRep[x][y] = 0;
      }
    }

    return mapRep;
  }

  updateMapRep(x, y, val) {
    this.state[y][x] = val;
  }

  addElementFromMap() {
    console.log ("Adding");
  }
}