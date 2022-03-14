import Phaser from 'phaser';

import crossbutton from '../../assets/donate/cross.png';
import paydone from '../../assets/donate/PaymentComplete.png';
import Button from '../../objects/Button';
import buttonclick from '../../sounds/buttonclick.mp3';
import buttonhover from '../../sounds/buttonhover.mp3';

let scene;

let screenCenterX;
let screenCenterY;

export class PaySuccessScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PaySuccess',
        });
    }

    preload() {
        this.load.image('paydone', paydone);
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

        scene.add.image(screenCenterX, screenCenterY + 10, 'paydone').setScale(0.9);

        const crossButton = new Button(
            scene,
            screenCenterX + 360,
            screenCenterY - 200,
            'crossbutton',
        )
            .setDownTexture('crossbutton')
            .setButtonName('Close')
            .setScale(0.03)
            .setDownSfx(downSfx)
            .setOverSfx(overSfx);
        crossButton.on('pointerup', () => {
            this.scene.stop('PaySuccess');
            this.scene.resume('DonateScene');
        });

        scene.add.existing(crossButton);
    }
}
