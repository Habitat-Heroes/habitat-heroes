import Phaser from 'phaser';

import loginbutton from '../assets/game_menu/long_button.png';
import menu from '../assets/game_menu/woodboard_no_cblogo.png';
import Button from '../objects/Button';
import { setName } from '../reducers/userReducer';
import store from '../store';

let scene;

let screenCenterX;
let screenCenterY;
let nameField;
let ratio;

export class LoginScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'login',
    });
  }

  preload() {
    this.load.image('menu', menu);
    this.load.image('loginbutton', loginbutton);
    // TODO: Replace the following with the actual textfield BG
    this.load.image('textfield', loginbutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    nameField = document.getElementById('name');
    ratio = this.cameras.main.width / this.cameras.main.height;
  }

  create() {
    scene = this;
    scene.add.image(screenCenterX, screenCenterY + 10, 'menu').setScale(0.75);

    const loginButton = new Button(
      scene,
      screenCenterX,
      screenCenterY + 170,
      'loginbutton',
    ).setDownTexture('loginbutton');
    loginButton.depth = 100;
    loginButton.scale = 0.7;
    loginButton.setButtonName('Get Started!');
    loginButton.on('pointerup', this.onGetStartedClick.bind(this));
    scene.add.existing(loginButton);

    scene.add.image(screenCenterX, screenCenterY + 10, 'textfield');

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

  static updateNameField() {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    let gameHeight = windowHeight;
    let gameWidth = windowWidth;

    // Constrain the sizes by the smaller dimension
    if (gameHeight * ratio < gameWidth) {
      gameWidth = gameHeight * ratio;
    } else if (gameWidth / ratio < gameHeight) {
      gameHeight = gameWidth / ratio;
    }

    const height = gameHeight / 10;
    const width = gameWidth / 3.2;
    const top = (windowHeight - height) / 2;
    const left = (windowWidth - width) / 2;

    nameField.style.height = `${height}px`;
    nameField.style.fontSize = `${height * 0.5}px`;
    nameField.style.width = `${width}px`;
    nameField.style.top = `${top}px`;
    nameField.style.left = `${left}px`;
  }
}
