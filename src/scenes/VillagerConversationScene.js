import Phaser from 'phaser';

import gratitudeboard from '../assets/build_menu/GratitudeBoardBase.png';
import closebutton from '../assets/game_menu/close_button.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import {THANK_YOU_TEXT, VILLAGER1_TEXT, VILLAGER2_TEXT, VILLAGER3_TEXT} from '../utils/constants';

let scene;

let screenCenterX;
let screenCenterY;

export class VillagerConversationScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'VillagerConversationScene',
    });
  }

  preload() {
    this.load.image('gratitudeboard', gratitudeboard);
    this.load.image('closebutton', closebutton);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create(data) {
    scene = this;
    const downSfx = this.sound.add('buttonclick');
    const overSfx = this.sound.add('buttonhover');

    scene.add
      .image(screenCenterX, screenCenterY + 10, 'gratitudeboard')
      .setScale(0.8);

    const { villager } = data;
    let text = THANK_YOU_TEXT(villager);
    if (villager === 1) {
      text = VILLAGER1_TEXT;
    } else if (villager === 2) {
      text = VILLAGER2_TEXT;
    } else if (villager === 3) {
      text = VILLAGER3_TEXT;
    }

    const thankYouText = scene.add
      .text(screenCenterX - 320, screenCenterY - 130, text, {
        fontFamily: 'Quicksand',
        fontSize: 26,
        color: '#fff',
        align: 'left',
        lineSpacing: 12,
        strokeThickness: 1,
      })
      .setDepth(850);

    const closeButton = new Button(
      scene,
      screenCenterX + 380,
      screenCenterY - 230,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setScale(0.5)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    closeButton.on('pointerup', () => {
      this.scene.stop('VillagerConversationScene');
      this.scene.resume('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
    scene.add.existing(thankYouText);
  }
}
