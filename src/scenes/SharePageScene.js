import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import fbbutton from '../assets/game_menu/long_button.png';
import shareboard from '../assets/game_menu/woodboard.png';
import Button from '../objects/Button';

let scene;

let screenCenterX;
let screenCenterY;

export class SharePageScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'sharepage'
    });
  }

  preload() {
    this.load.image('shareboard', shareboard);
    this.load.image('fbbutton', fbbutton);
    this.load.image('closebutton', closebutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    scene = this;
    scene.add.image(screenCenterX, screenCenterY + 10, 'shareboard').setScale(0.75);
    const freeHutButton = new Button(scene, screenCenterX - 210, screenCenterY + 175, 'fbbutton')
      .setDownTexture('fbbutton');
    freeHutButton.depth = 100;
    freeHutButton.scale = 0.3;
    freeHutButton.setButtonName('Share on Facebook!');
    freeHutButton.on('pointerup', () => {
      const url = 'https://github.com/Habitat-Heroes/habitat-heroes'; // TODO: to be replaced individual link
      const shareUrl = `http://www.facebook.com/sharer/sharer.phpu=${url}`;
      window.open(shareUrl, 'NewWindow'); // , params
    });

    const closeButton = new Button(scene, screenCenterX + 340, screenCenterY - 218, 'closebutton')
      .setDownTexture('closebutton');
    closeButton.scale = 0.8;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.start('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
    scene.add.existing(freeHutButton);
  }

}
