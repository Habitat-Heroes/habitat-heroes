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
import { PayScene10 } from './scenes/payscenes/PayScene10';
import { PayScene20 } from './scenes/payscenes/PayScene20';
import { PaySuccessScene } from './scenes/payscenes/PaySuccessScene';
import { QuestScene } from './scenes/QuestScene';
import { QuizScene } from './scenes/QuizScene';
import { SharePageScene } from './scenes/SharePageScene';
import { ShopScene } from './scenes/ShopScene';
import { ThankYouScene } from './scenes/ThankYouScene';
import {VillagerConversationScene} from './scenes/VillagerConversationScene';

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
        PaySuccessScene,
        PayScene1,
        PayScene5,
        PayScene10,
        PayScene20,
        SharePageScene,
        ShopScene,
        InventoryScene,
        ThankYouScene,
        QuizScene,
        QuestScene,
        VillagerConversationScene
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
