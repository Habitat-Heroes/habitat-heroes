import Phaser from 'phaser';

import crossbutton from '../../assets/donate/cross.png';
import payment from '../../assets/donate/StripePaymentBase.png';
import pay20 from '../../assets/donate/StripeSGD20.png';
import Button from '../../objects/Button';
import { increaseByAmount } from '../../reducers/coinsReducer';
import buttonclick from '../../sounds/buttonclick.mp3';
import buttonhover from '../../sounds/buttonhover.mp3';
import store from '../../store';


let scene;

let screenCenterX;
let screenCenterY;

export class PayScene20 extends Phaser.Scene {
    constructor() {
        super({
            key: 'PayScene20',
        });
    }

    preload() {
        this.load.image('payment', payment);
        this.load.image('pay20', pay20);
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

        scene.add.image(screenCenterX, screenCenterY + 10, 'payment').setScale(0.9);
        scene.add.image(screenCenterX, screenCenterY + 210, 'pay20').setScale(0.9);

        const pay20Button = new Button(
            scene,
            screenCenterX, screenCenterY + 210,
            'pay20',
        )
            .setButtonName('Pay SGD20')
            .setTint()
            .setScale(0.9)
            .setOverTint()
            .setUpTint()
            .setDisabledTint()
            .setDownSfx(downSfx)
            .setOverSfx(overSfx);
        pay20Button.on('pointerup', () => {
            this.scene.stop('PayScene20');
            this.scene.resume('DonateScene');
            store.dispatch(increaseByAmount(20000));
        });

        const crossButton = new Button(
            scene,
            screenCenterX + 298,
            screenCenterY - 250,
            'crossbutton',
        )
            .setDownTexture('crossbutton')
            .setButtonName('Close')
            .setScale(0.03)
            .setDownSfx(downSfx)
            .setOverSfx(overSfx);
        crossButton.on('pointerup', () => {
            this.scene.stop('PayScene20');
            this.scene.resume('DonateScene');
        });

        scene.add.existing(pay20Button);
        scene.add.existing(crossButton);
    }
}
