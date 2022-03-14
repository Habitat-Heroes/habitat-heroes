import Phaser from 'phaser';

import sharenewsbutton from '../assets/build_menu/GratitudeBoard_NewsButton.png';
import closebutton from '../assets/game_menu/close_button.png';
import shareboard from '../assets/game_menu/woodboard.png';
import fbbutton from '../assets/social_media/FacebookButton.png';
import insbutton from '../assets/social_media/InstagramButton.png';
import photo from '../assets/social_media/My_Large_House_At_HarbitatHeroes.png';
import telebutton from '../assets/social_media/TelegramButton.png';
import twibutton from '../assets/social_media/TwitterButton.png';
import whatsbutton from '../assets/social_media/WhatsappButton.png';
import Button from '../objects/Button';
import { updateQuests } from '../reducers/questReducer';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import success from '../sounds/success.mp3';
import store from '../store';
import { DEFAULT_SFX_CONFIG } from '../utils/constants';

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
    this.load.image('sharenewsbutton', sharenewsbutton);
    this.load.image('photo', photo);
    this.load.image('fbbutton', fbbutton);
    this.load.image('insbutton', insbutton);
    this.load.image('telebutton', telebutton);
    this.load.image('twibutton', twibutton);
    this.load.image('whatsbutton', whatsbutton);
    this.load.image('closebutton', closebutton);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.audio('success', success);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    scene = this;
    const downSfx = this.sound.add('buttonclick');
    const overSfx = this.sound.add('buttonhover');
    const successSfx = this.sound.add('success');
    scene.add
      .image(screenCenterX, screenCenterY + 10, 'shareboard')
      .setScale(0.8);
    scene.add
      .image(screenCenterX, screenCenterY - 40, 'sharenewsbutton')
      .setDisplaySize(600, 300); // setScale(0.9);
    scene.add.image(screenCenterX, screenCenterY - 40, 'photo').setScale(0.8); // .setDisplaySize(600, 300)
    const fbButton = new Button(
      scene,
      screenCenterX - 240,
      screenCenterY + 180,
      'fbbutton',
    )
      .setDownTexture('fbbutton')
      .setButtonName('Share on Facebook!')
      .setDepth(100)
      .setScale(0.4)
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    fbButton.on('pointerup', () => {
      if (!store.getState().quest.hasSharedOnSocialMedia) {
        successSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateQuests({ hasSharedOnSocialMedia: true }));
      }
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
      .setButtonName('Share on Instagram!')
      .setDepth(100)
      .setScale(0.4)
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    insButton.on('pointerup', () => {
      if (!store.getState().quest.hasSharedOnSocialMedia) {
        successSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateQuests({ hasSharedOnSocialMedia: true }));
      }
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
      .setButtonName('Share on Telegram!')
      .setDepth(100)
      .setScale(0.4)
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    teleButton.on('pointerup', () => {
      if (!store.getState().quest.hasSharedOnSocialMedia) {
        successSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateQuests({ hasSharedOnSocialMedia: true }));
      }
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
      .setButtonName('Share on Twitter!')
      .setDepth(100)
      .setScale(0.4)
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    twiButton.on('pointerup', () => {
      if (!store.getState().quest.hasSharedOnSocialMedia) {
        successSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateQuests({ hasSharedOnSocialMedia: true }));
      }
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
      .setButtonName('Share on Whatsapp!')
      .setDepth(100)
      .setScale(0.4)
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    whatsButton.on('pointerup', () => {
      if (!store.getState().quest.hasSharedOnSocialMedia) {
        successSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateQuests({ hasSharedOnSocialMedia: true }));
      }
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
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setScale(0.8)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
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
