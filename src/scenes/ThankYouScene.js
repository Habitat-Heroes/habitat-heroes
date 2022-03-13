import Phaser from 'phaser';

import panel from '../assets/build_menu/GratitudeBoard_NewsButton.png';
import gratitudeboard from '../assets/build_menu/GratitudeBoardBase.png';
import closebutton from '../assets/game_menu/close_button.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import { THANK_YOU_TEXT } from '../utils/constants';

let scene;

let screenCenterX;
let screenCenterY;

export class ThankYouScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'ThankYouScene',
    });
  }

  preload() {
    this.load.image('gratitudeboard', gratitudeboard);
    this.load.image('panel', panel);
    this.load.image('closebutton', closebutton);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    scene = this;
    const downSfx = this.sound.add('buttonclick');
    const overSfx = this.sound.add('buttonhover');

    scene.add
      .image(screenCenterX, screenCenterY + 10, 'gratitudeboard')
      .setScale(0.8);
    const thankYouText = scene.add
      .text(screenCenterX - 330, screenCenterY - 130, THANK_YOU_TEXT, {
        fontFamily: 'Quicksand',
        fontSize: 25,
        color: '#fff',
        align: 'left',
        lineSpacing: 12,
        strokeThickness: 2.5,
      })
      .setDepth(850);

    const panelButton = new Button(
      scene,
      screenCenterX,
      screenCenterY + 150,
      'panel',
    )
      .setButtonName('Learn More')
      .setScale(0.6)
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    panelButton.on('pointerup', () => {
      window.open(
        'http://habitatcambodia.org/what-we-build/land-and-housing-advocacy/',
        'pop',
        'width=1200, height=800, scrollbars=no',
      );
    });

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
      this.scene.stop('ThankYouScene');
      this.scene.resume('HabitatHeroesScene');
    });

    scene.add.existing(panelButton);
    scene.add.existing(closeButton);
    scene.add.existing(thankYouText);
  }
}
