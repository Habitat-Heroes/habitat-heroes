import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import nextbutton from '../assets/game_menu/next_button.png';
import prevbutton from '../assets/game_menu/prev_button.png';
import background from '../assets/game_menu/woodboard_no_cblogo.png';
import Button from '../objects/Button';

export class ShopScene extends Phaser.Scene {

  screenCenterX;

  screenCenterY;

  prevButton;

  nextButton;

  constructor() {
    super({
      key: 'ShopScene'
    });
  }

  preload() {
    this.load.image('background', background);
    this.load.image('closebutton', closebutton);
    this.load.image('prevbutton', prevbutton);
    this.load.image('nextbutton', nextbutton);

    this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.add.image(this.screenCenterX, this.screenCenterY + 10, 'background').setScale(0.85);

    this.add.text(640, 100, 'Shop', {
      fontFamily: 'Graduate',
      fontSize: 90,
      color: '#fff',
      strokeThickness: 2
    });

    const closeButton = new Button(this, this.screenCenterX + 390, this.screenCenterY - 240, 'closebutton')
      .setDownTexture('closebutton');
    closeButton.depth = 800;
    closeButton.scale = 0.6;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.stop('ShopScene');
      this.scene.resume('HabitatHeroesScene');
    });
    this.add.existing(closeButton);

    this.prevButton = new Button(this, this.screenCenterX - 360, this.screenCenterY + 50, 'prevbutton')
      .setDownTexture('prevbutton');
    this.prevButton.scale = 0.4;
    this.prevButton.depth = 800;
    this.prevButton.setButtonName('Previous Page');
    this.prevButton.on('pointerup', () => {
      // TODO
    });
    this.add.existing(this.prevButton);

    this.nextButton = new Button(this, this.screenCenterX + 368, this.screenCenterY + 50, 'nextbutton')
      .setDownTexture('nextbutton');
    this.nextButton.scale = 0.4;
    this.nextButton.depth = 800;
    this.nextButton.setButtonName('Next Page');
    this.nextButton.on('pointerup', () => {
      // TODO
    });
    this.add.existing(this.nextButton);

  }
}