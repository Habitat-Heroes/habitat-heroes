import Phaser from 'phaser';

import buildmenu from '../assets/build_menu/BuildMenuBase.png';
import freebutton from '../assets/build_menu/BuildMenuFreeButton.png';
import purchasebutton from '../assets/build_menu/BuildMenuPurchaseButton.png';
import closebutton from '../assets/game_menu/close_button.png';
import Button from '../objects/Button';

let scene;

let screenCenterX;
let screenCenterY;

export class BuildMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'buildMenu'
    });
  }

  preload() {
    this.load.image('buildmenu', buildmenu);
    this.load.image('freebutton', freebutton);
    this.load.image('purchasebutton', purchasebutton);
    this.load.image('closebutton', closebutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    scene = this;
    scene.add.image(screenCenterX, screenCenterY + 10, 'buildmenu').setScale(0.75);
    const closeButton = new Button(scene, screenCenterX + 330, screenCenterY - 250, 'closebutton')
      .setDownTexture('closebutton');
    closeButton.depth = 100;
    closeButton.scale = 0.5;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.start('HabitatHeroesScene');
    });
    scene.add.existing(closeButton);
  }

}
