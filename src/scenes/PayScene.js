import Phaser from 'phaser';

import payment from '../assets/donate/StripePayment1.png';
import closebutton from '../assets/game_menu/close_button.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';

let scene;

let screenCenterX;
let screenCenterY;

export class PayScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'PayScene',
    });
  }

  preload() {
    this.load.image('payment', payment);
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

    scene.add.image(screenCenterX, screenCenterY + 10, 'payment').setScale(0.9);

    const closeButton = new Button(
      scene,
      screenCenterX + 288,
      screenCenterY - 250,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setScale(0.4)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    closeButton.on('pointerup', () => {
      this.scene.stop('PayScene');
      this.scene.resume('DonateScene');
    });

    scene.add.existing(closeButton);
  }
}
