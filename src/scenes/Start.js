export default class Start extends Phaser.Scene
{
    constructor ()
    {
        super("Start");
    }

    preload ()
    {

    }

    startGame() {
      this.scene.switch('Game');
    }


    create ()
    {
      var text = this.add.text(100,100, 'Welcome to my game!');
      text.setInteractive({ useHandCursor: true });
      text.on('pointerdown', () => this.startGame());
    }
}