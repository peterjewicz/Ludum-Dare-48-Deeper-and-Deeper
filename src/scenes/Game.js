import Phaser from 'phaser';

// data/functions
import { DRAW_MODES, FLOOR_START, SQUARE_SIZE, MAP_SIZE } from '../scripts/constants';
import { draw } from '../scripts/drawing';

// Modules
import Map from '../modules/Map'

// image imports
import dirt from '../assets/dirt.png';
import base from '../assets/base.png';
import elevator from '../assets/elevator.jpg';
import shaft from '../assets/shaft.jpg';


export default class Game extends Phaser.Scene
{
    constructor ()
    {
        super("Game");
        this.loopVar = 0;
        this.scrolled = 0;
        this.drawMode = DRAW_MODES.ELEVATOR;
        this.map = new Map(MAP_SIZE, SQUARE_SIZE);
        this.cash = 1000;
    }

    preload ()
    {
        this.load.image('dirt', dirt);
        this.load.image('base', base);
        this.load.image('elevator', elevator);
        this.load.image('shaft', shaft);
    }

    setCash(cash) {
      this.cash = cash;
    }

    removeCash(amount) {
      console.log(amount)
      this.setCash(this.cash - amount);
    }

    checkPurchase(amount) {
      return this.cash >= amount;
    }

    setDrawMode(mode) {
      this.drawMode = mode;
    }

    drawDirt () {
      // Our initial drawing of the dirt for our ground
      for (let x = 0; x < 100; x++) {
        for (let y = FLOOR_START / SQUARE_SIZE; y < 100; y++) {
          let xPos = x * 16;
          let yPos = y * 16;
          this.add.image(xPos, yPos, 'dirt').setOrigin(0, 0).setInteractive();
        }
      }

    }

    create ()
    {
        this.cameras.main.setBounds(0, 0, 1600, 1600, true)
        this.cameras.main.centerOn(0, 0)

        this.drawDirt();

        this.add.image(250, 65, 'base').setOrigin(0, 0);

        this.text = this.add.text(0, 0).setText('Click to move').setScrollFactor(0);
        this.text.setShadow(1, 1, '#000000', 2);

        this.elevatorText = this.add.text(310, 360).setText('Elevator').setScrollFactor(0).setShadow(1, 1, '#000000', 5).setInteractive({ useHandCursor: true });
        this.elevatorText.on('pointerdown', () => {
          this.setDrawMode(DRAW_MODES.ELEVATOR);
        })

        this.shaftText = this.add.text(310, 380).setText('Shaft').setScrollFactor(0).setInteractive({ useHandCursor: true });
        this.shaftText.on('pointerdown', () => {
          this.setDrawMode(DRAW_MODES.SHAFT);
        })

        this.cashText = this.add.text(320, 5).setText(`$${this.cash}`).setScrollFactor(0).setInteractive({ useHandCursor: true });
        //  Camera controls
        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.06,
            drag: 0.0005,
            maxSpeed: 1.0
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);


    }

    update (time, delta)
    {
        const cam = this.cameras.main;
        this.text.setText(['x: ' + cam.scrollX, 'y: ' + cam.scrollY ]);
        this.controls.update(delta);

        let pointer = this.input.activePointer;
        if (pointer.isDown) {
          draw(this, pointer, this.drawMode);
          // console.log(this.map.state)
        }

        if (this.drawMode === DRAW_MODES.ELEVATOR) {
          this.elevatorText.setShadow(1, 1, '#000000', 5);
          this.shaftText.setShadow(0, 0, '#000000', 0);
        } else {
          this.shaftText.setShadow(1, 1, '#000000', 5);
          this.elevatorText.setShadow(0, 0, '#000000', 0);
        }

        this.cashText.setText(`$${this.cash}`)
    }
}