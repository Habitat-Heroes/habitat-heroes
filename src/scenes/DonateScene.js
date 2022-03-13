import Phaser from 'phaser';

import donatemenu from '../assets/donate/DonateBoardBase.png';
import d1 from '../assets/donate/SGD1.png';
import d5 from '../assets/donate/SGD5.png';
import d10 from '../assets/donate/SGD10.png';
import d20 from '../assets/donate/SGD20.png';
import closebutton from '../assets/game_menu/close_button.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';

let scene;

let screenCenterX;
let screenCenterY;

export class DonateScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'DonateScene',
    });
  }

  preload() {
    this.load.image('donatemenu', donatemenu);
    this.load.image('d1', d1);
    this.load.image('d5', d5);
    this.load.image('d10', d10);
    this.load.image('d20', d20);
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

    scene.add.image(screenCenterX, screenCenterY + 10, 'donatemenu').setScale(0.9);

    scene.add.image(screenCenterX-120, screenCenterY + 40, 'd1').setScale(0.8);
    scene.add.image(screenCenterX+135, screenCenterY + 40, 'd5').setScale(0.8);
    scene.add.image(screenCenterX-120, screenCenterY + 215, 'd10').setScale(0.8);
    scene.add.image(screenCenterX+135, screenCenterY + 215, 'd20').setScale(0.8);

    const d1Button = new Button(
        scene,
        screenCenterX-120,
        screenCenterY + 40,
        'd1',
      )
        .setDownTexture('closebutton')
        .setButtonName('Donate SGD1')
        .setScale(0.8)
        .setDownSfx(downSfx)
        .setOverSfx(overSfx);
      d1Button.on('pointerup', () => {
        scene.scene.launch('NewsBoardScene');
        scene.scene.pause('DonateScene');
      });

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
      this.scene.stop('DonateScene');
      this.scene.resume('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
  }
}