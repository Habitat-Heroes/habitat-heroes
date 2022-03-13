import Phaser from 'phaser';

import photo from '../assets/ads/ads_clean.png';
import closebutton from '../assets/game_menu/close_button.png';
import playbutton from '../assets/game_menu/tick_button.png';
import newsboard from '../assets/game_menu/woodboard.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';

let scene;

let screenCenterX;
let screenCenterY;

export class AdsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'AdsScene',
    });
  }

  preload() {
    this.load.image('photo', photo);
    this.load.image('newsboard', newsboard);
    this.load.image('playbutton', playbutton);
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

    scene.add.image(screenCenterX, screenCenterY + 10, 'newsboard').setScale(0.6);
    scene.add.image(screenCenterX, screenCenterY + 10, 'photo').setScale(0.17);

    const playButton = new Button(
        scene,
        screenCenterX,
        screenCenterY + 10,
        'playbutton',
      )
        .setDownTexture('playbutton')
        .setButtonName('Watch the video')
        .setScale(0.3)
        .setDownSfx(downSfx)
        .setOverSfx(overSfx);
      playButton.on('pointerup', () => {
        window.open(
            'https://youtu.be/XAOotMKkg-I',
            'pop',
            'width=1200, height=800, scrollbars=no',
          );
      });

    const closeButton = new Button(
      scene,
      screenCenterX + 275,
      screenCenterY - 170,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setScale(0.6)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    closeButton.on('pointerup', () => {
      this.scene.stop('AdsScene');
      this.scene.resume('HabitatHeroesScene');
    });

    scene.add.existing(playButton);
    scene.add.existing(closeButton);
  }
}
