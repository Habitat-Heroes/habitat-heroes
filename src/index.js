import Phaser from 'phaser';

import { AdsScene } from './scenes/AdsScene';
import { BuildMenuScene } from './scenes/BuildMenuScene';
import { DonateScene } from './scenes/DonateScene';
import { HabitatHeroesScene } from './scenes/HabitatHeroesScene';
import { InventoryScene } from './scenes/InventoryScene';
import { LoginScene } from './scenes/LoginScene';
import { NewsBoardScene } from './scenes/NewsBoardScene';
import { PayScene } from './scenes/PayScene';
import { PayScene1 } from './scenes/payscenes/PayScene1';
import { PayScene5 } from './scenes/payscenes/PayScene5';
import { QuizScene } from './scenes/QuizScene';
import { SharePageScene } from './scenes/SharePageScene';
import { ShopScene } from './scenes/ShopScene';
import { ThankYouScene } from './scenes/ThankYouScene';

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
      scene: [
        LoginScene,
        HabitatHeroesScene,
        NewsBoardScene,
        AdsScene,
        BuildMenuScene,
        DonateScene,
        PayScene,
        PayScene1,
        PayScene5,
        SharePageScene,
        ShopScene,
        InventoryScene,
        ThankYouScene,
        QuizScene,
      ],
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
