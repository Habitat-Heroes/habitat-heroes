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
    const freeHutButton = new Button(scene, screenCenterX - 210, screenCenterY + 190, 'freebutton')
      .setDownTexture('freebutton');
    freeHutButton.depth = 100;
    freeHutButton.scale = 0.8;
    freeHutButton.setButtonName('Build Basic Hut');
    freeHutButton.on('pointerup', () => {
      this.scene.start('HabitatHeroesScene');
    });

    const freeHouseButton = new Button(scene, screenCenterX + 5, screenCenterY + 190, 'freebutton')
      .setDownTexture('freebutton');
    freeHouseButton.scale = 0.8;
    freeHouseButton.setButtonName('Build Brick House');
    freeHouseButton.on('pointerup', () => {
      // TODO Add in building house animation + flow
      this.scene.start('HabitatHeroesScene');
    });

    const purchaseButton = new Button(scene, screenCenterX + 230, screenCenterY + 190, 'purchasebutton')
      .setDownTexture('purchasebutton');
    purchaseButton.scale = 0.8;
    purchaseButton.setButtonName('Build Concrete House');
    purchaseButton.on('pointerup', () => {
      // TODO Add in building house animation + flow
      this.scene.start('HabitatHeroesScene');
    });

    const closeButton = new Button(scene, screenCenterX + 330, screenCenterY - 220, 'closebutton')
      .setDownTexture('closebutton');
    closeButton.scale = 0.5;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.start('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
    scene.add.existing(freeHutButton);
    scene.add.existing(freeHouseButton);
    scene.add.existing(purchaseButton);
  }

}
