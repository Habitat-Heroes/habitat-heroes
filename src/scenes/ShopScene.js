import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import background from '../assets/game_menu/woodboard_no_cblogo.png';
import Button from '../objects/Button';

export class ShopScene extends Phaser.Scene {

  screenCenterX;

  screenCenterY;

  constructor() {
    super({
      key: 'ShopScene'
    });
  }

  preload() {
    this.load.image('background', background);
    this.load.image('closebutton', closebutton);

    this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.add.image(this.screenCenterX, this.screenCenterY + 10, 'background').setScale(0.75);


    const closeButton = new Button(this, this.screenCenterX + 340, this.screenCenterY - 218, 'closebutton')
      .setDownTexture('closebutton');
    closeButton.scale = 0.8;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.stop('ShopScene');
      this.scene.resume('HabitatHeroesScene');
    });

    this.add.existing(closeButton);
  }
}