import Phaser from 'phaser';

import crossbutton from '../../assets/donate/cross.png';
import payment from '../../assets/donate/StripePaymentBase.png';
import pay1 from '../../assets/donate/StripeSGD1.png';
import Button from '../../objects/Button';
import { increaseByAmount } from '../../reducers/coinsReducer';
import { addDonation } from '../../reducers/userReducer';
import buttonclick from '../../sounds/buttonclick.mp3';
import buttonhover from '../../sounds/buttonhover.mp3';
import store from '../../store';

let scene;

let screenCenterX;
let screenCenterY;

export class PayScene1 extends Phaser.Scene {
  constructor() {
    super({
      key: 'PayScene1',
    });
  }

  preload() {
    this.load.image('payment', payment);
    this.load.image('pay1', pay1);
    this.load.image('crossbutton', crossbutton);
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

    scene.add.image(screenCenterX, screenCenterY + 10, 'payment').setScale(0.6);

    const pay1Button = new Button(
      scene,
      screenCenterX,
      screenCenterY + 150,
      'pay1',
    )
      .setDownTexture('pay1')
      .setButtonName('Pay SGD 1')
      .setUpTint(0xffffff)
      .setOverTint(0xffffff)
      .setDownTint(0xffffff)
      .setTint(0xffffff)
      .setDisabledTint(0xffffff)
      .setScale(0.6)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    pay1Button.on('pointerup', () => {
      this.scene.stop('PayScene1');
      this.scene.launch('PaySuccess');
      store.dispatch(increaseByAmount(1000));
      store.dispatch(addDonation(1));
    });

    const crossButton = new Button(
      scene,
      screenCenterX + 230,
      screenCenterY - 180,
      'crossbutton',
    )
      .setDownTexture('crossbutton')
      .setButtonName('Close')
      .setScale(0.03)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    crossButton.on('pointerup', () => {
      this.scene.stop('PayScene1');
      this.scene.resume('DonateScene');
    });

    scene.add.existing(pay1Button);
    scene.add.existing(crossButton);
  }
}
