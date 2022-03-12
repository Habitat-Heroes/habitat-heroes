import Phaser from 'phaser';

import menu from '../assets/login/LoginBoard_NoLoginButton.png';
import loginbutton from '../assets/login/LoginButton.png';
import Button from '../objects/Button';
import { setName } from '../reducers/userReducer';
import store from '../store';

let scene;

let screenCenterX;
let screenCenterY;
let nameField;
let canvas;

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

    scene.add.image(screenCenterX, screenCenterY + 10, 'menu').setScale(0.75);

    const loginButton = new Button(
      scene,
      screenCenterX,
      screenCenterY + 170,
      'loginbutton',
    )
      .setDownTexture('loginbutton')
      .clearTint();
    loginButton.depth = 100;
    loginButton.scale = 0.7;
    loginButton.setButtonName('Get Started!');
    loginButton.on('pointerup', this.onGetStartedClick.bind(this));
    scene.add.existing(loginButton);

    LoginScene.updateNameField();
    window.addEventListener('resize', LoginScene.updateNameField);
  }

  onGetStartedClick() {
    const { value } = nameField;
    if (!value || value === '') {
      return;
    }
    nameField.style.display = 'none';
    store.dispatch(setName(value.trim()));
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
