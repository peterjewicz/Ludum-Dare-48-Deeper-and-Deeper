import Phaser from 'phaser';
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
    }

    preload ()
    {
        this.load.image('dirt', dirt);
        this.load.image('base', base);
        this.load.image('elevator', elevator);
        this.load.image('shaft', shaft);
    }

    drawDirt () {
      // Our initial drawing of the dirt for our ground
      for (let x = 0; x < 100; x++) {
        for (let y = 10; y < 100; y++) {
          let xPos = x * 16;
          let yPos = y * 16;
          this.add.image(xPos, yPos, 'dirt').setOrigin(0, 0).setInteractive();
        //   dirtPatch.on('pointerdown', (pointer) => {
        //     // console.log(pointer.worldX)
        //     // console.log(pointer.worldY)
        //     // // console.log(this.x);
        //     // // console.log(this.y);
        //     this.add.image(pointer.worldX, pointer.worldY, 'shaft').setOrigin(0, 0)
        //   });
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


          let xPos = (parseInt (pointer.position.x / 16)) * 16;
          let yPos = (parseInt (pointer.position.y / 16)) * 16;

          this.add.image(xPos, yPos, 'shaft').setOrigin(0, 0);
        }
    }
}