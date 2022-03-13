import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import newsboard from '../assets/newsboard/NewsboardBase.png';
import panel1 from '../assets/newsboard/NewsPanelAmazon.png';
import panel2 from '../assets/newsboard/NewsPanelCityBank.png';
import panel3 from '../assets/newsboard/NewsPanelZillow.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';

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

    scene.add.image(screenCenterX, screenCenterY + 10, 'newsboard').setScale(0.9);

    const panel1Button = new Button(
      scene,
      screenCenterX - 180,
      screenCenterY + 80,
      'panel1',
    )
      .setButtonName('View Details')
      .setTint()
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setScale(0.95)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    panel1Button.on('pointerup', () => {
      window.open(
        'https://www.mpamag.com/us/specialty/commercial/amazon-makes-100-million-investment-in-new-affordable-housing/258109',
        'pop',
        'width=1200, height=800, scrollbars=no',
      );
    });

    const panel2Button = new Button(
      scene,
      screenCenterX + 210,
      screenCenterY - 30,
      'panel2',
    )
      .setButtonName('View Details')
      .setTint()
      .setScale(0.95)
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    panel2Button.on('pointerup', () => {
      window.open(
        'https://www.habitat.org/newsroom/2022/city-national-bank-renews-partnership-habitat-humanity-third-year',
        'pop',
        'width=1200, height=800, scrollbars=no',
      );
    });

    const panel3Button = new Button(
      scene,
      screenCenterX + 210,
      screenCenterY + 180,
      'panel3',
    )
      .setButtonName('View Details')
      .setTint()
      .setScale(0.95)
      .setOverTint()
      .setUpTint()
      .setDisabledTint()
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    panel3Button.on('pointerup', () => {
      window.open(
        'https://www.un.org/en/observances/habitat-day',
        'pop',
        'width=1200, height=800, scrollbars=no',
      );
    });

    const closeButton = new Button(
      scene,
      screenCenterX + 430,
      screenCenterY - 250,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setScale(0.6)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
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
