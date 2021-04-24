import Phaser from 'phaser';

import Game from './scenes/Game'
import Start from './scenes/Start'



const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 400,
    height: 400,
    backgroundColor: '#4addea',
    scene: [Game, Start]
    // scene: [Start, Game] for the actual game
};

const game = new Phaser.Game(config);

