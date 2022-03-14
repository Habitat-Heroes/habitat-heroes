import Phaser from 'phaser';

import crossbutton from '../../assets/donate/cross.png';
import payment from '../../assets/donate/StripePaymentBase.png';
import pay1 from '../../assets/donate/StripeSGD1.png';
import Button from '../../objects/Button';
import { increaseByAmount } from '../../reducers/coinsReducer';
import buttonclick from '../../sounds/buttonclick.mp3';
import buttonhover from '../../sounds/buttonhover.mp3';
import store from '../../store';
import { COINS_BUTTON_CENTER } from '../../utils/constants';

let textObj;

const selectAmt = (state) => state.coins.amount;

let currentAmt = selectAmt(store.getState());

const handleAmtChange = () => {
    const previousAmt = currentAmt;
    currentAmt = selectAmt(store.getState());

    if (textObj != null && previousAmt !== currentAmt) {
        textObj.text = currentAmt;
    }
};

store.subscribe(handleAmtChange);

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

        scene.add.image(screenCenterX, screenCenterY + 10, 'payment').setScale(0.9);
        scene.add.image(screenCenterX, screenCenterY + 210, 'pay1').setScale(0.9);

        const [x, y] = COINS_BUTTON_CENTER;
        const pay1Button = new Button(
            scene,
            screenCenterX, screenCenterY + 210,
            'pay1',
        )
            .setButtonName('Pay SGD1')
            .setTint()
            .setScale(0.9)
            .setOverTint()
            .setUpTint()
            .setDisabledTint()
            .setDownSfx(downSfx)
            .setOverSfx(overSfx);
        pay1Button.on('pointerup', () => {
            this.scene.stop('PayScene1');
            this.scene.launch('PaySuccess');
            store.dispatch(increaseByAmount(1000));

            textObj = scene.add
                .text(x - 35, y - 20, currentAmt, {
                    fontFamily: 'Graduate',
                    fontSize: 28,
                    color: '#fff',
                    align: 'right',
                    strokeThickness: 2,
                })
                .setShadow(2, 2, '#333333', 2, false, true);
            textObj.depth = 850;
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
            this.scene.stop('PayScene1');
            this.scene.resume('DonateScene');
        });

        scene.add.existing(pay1Button);
        scene.add.existing(crossButton);
    }
}
