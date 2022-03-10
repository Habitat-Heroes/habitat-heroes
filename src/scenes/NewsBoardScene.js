import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import newsboard from '../assets/newsboard/NewsboardBase.png';
import panel1 from '../assets/newsboard/NewsPanelAmazon.png';
import panel2 from '../assets/newsboard/NewsPanelCityBank.png';
import panel3 from '../assets/newsboard/NewsPanelZillow.png';
import Button from '../objects/Button';

let scene;

let screenCenterX;
let screenCenterY;

export class NewsBoardScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'news'
    });
  }

  preload() {
    this.load.image('newsboard', newsboard);
    this.load.image('panel1', panel1);
    this.load.image('panel2', panel2);
    this.load.image('panel3', panel3);
    this.load.image('closebutton', closebutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    scene = this;

    scene.add.image(screenCenterX, screenCenterY + 10, 'newsboard').setScale(0.75);
    scene.add.image(screenCenterX - 150, screenCenterY + 40, 'panel1').setScale(0.75);
    scene.add.image(screenCenterX + 170, screenCenterY - 50, 'panel2').setScale(0.75);
    scene.add.image(screenCenterX + 170, screenCenterY + 120, 'panel3').setScale(0.75);
 
    const closeButton = new Button(scene, screenCenterX + 340, screenCenterY - 218, 'closebutton')
      .setDownTexture('closebutton');
    closeButton.scale = 0.6;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.start('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
  }
}
