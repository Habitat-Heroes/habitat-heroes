import Phaser from 'phaser';

import photoboard from '../assets/build_menu/GratitudeBoard_NewsButton.png';
import closebutton from '../assets/game_menu/close_button.png';
import shareboard from '../assets/game_menu/woodboard.png';
import fbbutton from '../assets/social_media/FacebookButton.png';
import insbutton from '../assets/social_media/InstagramButton.png';
import photo from '../assets/social_media/My_Large_House_At_HarbitatHeroes.png';
import telebutton from '../assets/social_media/TelegramButton.png';
import twibutton from '../assets/social_media/TwitterButton.png';
import whatsbutton from '../assets/social_media/WhatsappButton.png';
import Button from '../objects/Button';

let scene;

let screenCenterX;
let screenCenterY;

export class SharePageScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'SharePageScene',
    });
  }

  preload() {
    this.load.image('shareboard', shareboard);
    this.load.image('photoboard', photoboard);
    this.load.image('photo', photo);
    this.load.image('fbbutton', fbbutton);
    this.load.image('insbutton', insbutton);
    this.load.image('telebutton', telebutton);
    this.load.image('twibutton', twibutton);
    this.load.image('whatsbutton', whatsbutton);
    this.load.image('closebutton', closebutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    scene = this;
    scene.add
      .image(screenCenterX, screenCenterY + 10, 'shareboard')
      .setScale(0.8);
    scene.add
      .image(screenCenterX, screenCenterY - 40, 'photoboard')
      .setDisplaySize(600, 300); // setScale(0.9);
    scene.add.image(screenCenterX, screenCenterY - 40, 'photo').setScale(0.8); // .setDisplaySize(600, 300)
    const fbButton = new Button(
      scene,
      screenCenterX - 240,
      screenCenterY + 180,
      'fbbutton',
    )
      .setDownTexture('fbbutton')
      .clearTint();
    fbButton.depth = 100;
    fbButton.scale = 0.4;
    fbButton.setButtonName('Share on Facebook!');
    fbButton.on('pointerup', () => {
      window.open(
        'https://www.facebook.com/sharer/sharer.php?u=https://ibb.co/brg0qtD',
        'pop',
        'width=600, height=400, scrollbars=no',
      );
    });

    const insButton = new Button(
      scene,
      screenCenterX - 120,
      screenCenterY + 180,
      'insbutton',
    )
      .setDownTexture('insbutton')
      .clearTint();
    insButton.depth = 100;
    insButton.scale = 0.4;
    insButton.setButtonName('Share on Instagram!');
    insButton.on('pointerup', () => {
      window.open(
        'https://www.instagram.com/?url=https://www.drdrop.co/',
        'pop',
        'width=600, height=400, scrollbars=no',
      );
    });

    const teleButton = new Button(
      scene,
      screenCenterX,
      screenCenterY + 180,
      'telebutton',
    )
      .setDownTexture('telebutton')
      .clearTint();
    teleButton.depth = 100;
    teleButton.scale = 0.4;
    teleButton.setButtonName('Share on Telegram!');
    teleButton.on('pointerup', () => {
      window.open(
        'https://t.me/share/url?url=https://ibb.co/brg0qtD&text=Join me to build houses at Habitat Heroes!',
        'pop',
        'width=600, height=400, scrollbars=no',
      );
    });

    const twiButton = new Button(
      scene,
      screenCenterX + 120,
      screenCenterY + 180,
      'twibutton',
    )
      .setDownTexture('twibutton')
      .clearTint();
    twiButton.depth = 100;
    twiButton.scale = 0.4;
    twiButton.setButtonName('Share on Twitter!');
    twiButton.on('pointerup', () => {
      window.open(
        'https://twitter.com/intent/tweet?text=Join me to build houses at Habitat Heroes!',
        'pop',
        'width=600, height=400, scrollbars=no',
      );
    });

    const whatsButton = new Button(
      scene,
      screenCenterX + 249,
      screenCenterY + 180,
      'whatsbutton',
    )
      .setDownTexture('whatsbutton')
      .clearTint();
    whatsButton.depth = 100;
    whatsButton.scale = 0.4;
    whatsButton.setButtonName('Share on Whatsapp!');
    whatsButton.on('pointerup', () => {
      window.open(
        'https://wa.me/?text=https://ibb.co/brg0qtD',
        'pop',
        'width=600, height=400, scrollbars=no',
      );
    });

    const closeButton = new Button(
      scene,
      screenCenterX + 365,
      screenCenterY - 230,
      'closebutton',
    ).setDownTexture('closebutton');
    closeButton.scale = 0.8;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.stop('SharePageScene');
      this.scene.resume('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
    scene.add.existing(fbButton);
    scene.add.existing(insButton);
    scene.add.existing(teleButton);
    scene.add.existing(twiButton);
    scene.add.existing(whatsButton);
  }
}
