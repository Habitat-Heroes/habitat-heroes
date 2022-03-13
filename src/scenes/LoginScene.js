import Phaser from 'phaser';

import menu from '../assets/login/LoginBoard_NoLoginButton.png';
import loginbutton from '../assets/login/LoginButton.png';
import Button from '../objects/Button';
import { setName } from '../reducers/userReducer';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import loginbgm from '../sounds/loginbgm.mp3';
import thud from '../sounds/thud.mp3';
import store from '../store';
import { DEFAULT_SFX_CONFIG } from '../utils/constants';

let scene;

let screenCenterX;
let screenCenterY;
let nameField;
let canvas;

let bgm;

export class LoginScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'login',
    });
  }

  preload() {
    this.load.image('menu', menu);
    this.load.image('loginbutton', loginbutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    nameField = document.getElementById('name');
    canvas = document.querySelector('canvas');
    this.load.audio('loginbgm', loginbgm);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.audio('thud', thud);
  }

  static selectName(state) {
    return state.user.name;
  }

  create() {
    scene = this;

    const currentName = LoginScene.selectName(store.getState());
    if (currentName !== '') {
      nameField.style.display = 'none';
      this.scene.start('HabitatHeroesScene');
      return;
    }

    bgm = this.sound.add('loginbgm');
    bgm.play({
      ...DEFAULT_SFX_CONFIG,
      loop: true,
      volume: 0.5,
    });
    const downSfx = this.sound.add('buttonclick');
    const overSfx = this.sound.add('buttonhover');
    const thudSfx = this.sound.add('thud');

    scene.add.image(screenCenterX, screenCenterY + 10, 'menu').setScale(0.75);

    const loginButton = new Button(
      scene,
      screenCenterX,
      screenCenterY + 170,
      'loginbutton',
    )
      .setDownTexture('loginbutton')
      .setButtonName('Get Started!')
      .setDepth(100)
      .setScale(0.7)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx)
      .clearTint();
    loginButton.on('pointerup', this.onGetStartedClick.bind(this));
    scene.add.existing(loginButton);

    LoginScene.updateNameField();
    window.addEventListener('resize', LoginScene.updateNameField);
    nameField.addEventListener('input', () =>
      LoginScene.onNameChange(overSfx, thudSfx),
    );
  }

  static onNameChange(typeSfx, thudSfx) {
    const { value } = nameField;
    if (value.length > 10) {
      thudSfx.play(DEFAULT_SFX_CONFIG);
      nameField.value = value.substring(0, 10);
      return;
    }
    typeSfx.play(DEFAULT_SFX_CONFIG);
  }

  onGetStartedClick() {
    const { value } = nameField;
    if (!value || value === '') {
      return;
    }
    nameField.style.display = 'none';
    store.dispatch(setName(value.trim()));
    bgm.stop();
    this.scene.start('HabitatHeroesScene');
  }

  static parsePxStringToFloat(str) {
    return parseFloat(str.substring(0, str.length - 2));
  }

  static updateNameField() {
    const canvasHeight = LoginScene.parsePxStringToFloat(canvas.style.height);
    const canvasWidth = LoginScene.parsePxStringToFloat(canvas.style.width);
    const canvasMarginTop = LoginScene.parsePxStringToFloat(
      canvas.style.marginTop,
    );
    const canvasMarginLeft = LoginScene.parsePxStringToFloat(
      canvas.style.marginLeft,
    );

    const height = canvasHeight / 15;
    const width = canvasWidth / 3.8;

    nameField.style.height = `${height}px`;
    nameField.style.fontSize = `${height * 0.5}px`;
    nameField.style.width = `${width}px`;
    nameField.style.marginLeft = `${canvasMarginLeft + canvasWidth / 2.4}px`;
    nameField.style.marginTop = `${canvasMarginTop + canvasHeight / 2.13}px`;
  }
}
