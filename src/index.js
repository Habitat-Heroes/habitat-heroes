import Phaser from 'phaser';

import { BuildMenuScene } from './scenes/BuildMenuScene';
import { HabitatHeroesScene } from './scenes/HabitatHeroesScene';
import { NewsBoardScene } from './scenes/NewsBoardScene';

class Game extends Phaser.Game {
  constructor() {
    const config = {
      type: Phaser.WEBGL,
      backgroundColor: '#2d2d2d',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'phaser-iso-map',
        width: 1600,
        height: 800,
      },
      disableContextMenu: true,
      scene: [HabitatHeroesScene, NewsBoardScene, BuildMenuScene],
      banner: {
        hidePhaser: true,
      },
      physics: {
        default: 'arcade',
        fps: 60,
        arcade: {
          gravity: { y: 0 },
        },
      },
    };

    super(config);
  }
}

// eslint-disable-next-line no-unused-vars
const game = new Game();
