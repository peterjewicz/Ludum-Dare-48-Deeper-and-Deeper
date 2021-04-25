
export default class Map {
  constructor(size, single) { // assuming square for now
    this.state = this.generateMap(size, single);

    // We'll just precount these so we don't have to itterate each loop
    this.elevators = 0;
    this.shafts = 0;
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

    if (val === 2) {
      this.elevators++;
    } else if (val === 3) {
      this.shafts++;
    }
  }

  addElementFromMap() {
    console.log ("Adding");
  }
}