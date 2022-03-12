import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import newsboard from '../assets/newsboard/NewsboardBase.png';
import panel1 from '../assets/newsboard/NewsPanelAmazon.png';
import panel2 from '../assets/newsboard/NewsPanelCityBank.png';
import panel3 from '../assets/newsboard/NewsPanelZillow.png';
import Button from '../objects/Button';

let scene;

let screenCenterX;
let screenCenterY;

export class NewsBoardScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'NewsBoardScene',
        });
    }

    preload() {
        this.load.image('newsboard', newsboard);
        this.load.image('panel1', panel1);
        this.load.image('panel2', panel2);
        this.load.image('panel3', panel3);
        this.load.image('closebutton', closebutton);
        screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        screenCenterY =
            this.cameras.main.worldView.y + this.cameras.main.height / 2;
    }

    create() {
        scene = this;

        scene.add.image(screenCenterX, screenCenterY + 10, 'newsboard').setScale(1);

        const panel1Button = new Button(
            scene,
            screenCenterX - 200,
            screenCenterY + 60,
            'panel1',
        )
            .setTint()
            .setOverTint().setUpTint()
            .setDisabledTint();
        panel1Button.scale = 1.05;
        panel1Button.setButtonName('View Details');
        panel1Button.on('pointerup', () => {
            window.open(
                'https://www.mpamag.com/us/specialty/commercial/amazon-makes-100-million-investment-in-new-affordable-housing/258109',
                'pop',
                'width=1200, height=800, scrollbars=no',
            );
        });

        const panel2Button = new Button(
            scene,
            screenCenterX + 240,
            screenCenterY - 60,
            'panel2',
        )
            .setTint()
            .setOverTint().setUpTint()
            .setDisabledTint();
        panel2Button.setButtonName('View Details');
        panel2Button.on('pointerup', () => {
            window.open(
                'https://www.habitat.org/newsroom/2022/city-national-bank-renews-partnership-habitat-humanity-third-year',
                'pop',
                'width=1200, height=800, scrollbars=no',
            );
        });

        const panel3Button = new Button(
            scene,
            screenCenterX + 240,
            screenCenterY + 180,
            'panel3',
        )
            .setTint()
            .setOverTint().setUpTint()
            .setDisabledTint();
        panel3Button.setButtonName('View Details');
        panel3Button.on('pointerup', () => {
            window.open(
                'https://www.zillow.com/tech/the-home-project/',
                'pop',
                'width=1200, height=800, scrollbars=no',
            );
        });

        const closeButton = new Button(
            scene,
            screenCenterX + 450,
            screenCenterY - 330,
            'closebutton',
        ).setDownTexture('closebutton');
        closeButton.scale = 0.6;
        closeButton.setButtonName('Close');
        closeButton.on('pointerup', () => {
            this.scene.stop('NewsBoardScene');
            this.scene.resume('HabitatHeroesScene');
        });

        scene.add.existing(panel1Button);
        scene.add.existing(panel2Button);
        scene.add.existing(panel3Button);
        scene.add.existing(closeButton);
    }
}
