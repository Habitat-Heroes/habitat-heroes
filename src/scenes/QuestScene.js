import Phaser from 'phaser';

import basichut from '../assets/basic_hut.png';
import closebutton from '../assets/game_menu/close_button.png';
import longbutton from '../assets/game_menu/long_button.png';
import baseboard from '../assets/game_menu/vertical_baseboard.png';
import completed from '../assets/quest/completed.png';
import background from '../assets/quest/QuestboardBase.png';
import hfhflag from '../assets/shop/HFHflag.png';
import facebook from '../assets/social_media/FacebookButton.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import store from '../store';

export class QuestScene extends Phaser.Scene {
  screenCenterX;

  screenCenterY;

  downSfx;

  overSfx;

  constructor() {
    super({
      key: 'QuestScene',
    });
  }

  preload() {
    this.load.image('background', background);
    this.load.image('closebutton', closebutton);
    this.load.image('completed', completed);
    this.load.image('baseboard', baseboard);
    this.load.image('basichut', basichut);
    this.load.image('facebook', facebook);
    this.load.image('longbutton', longbutton);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.spritesheet('hfhflag', hfhflag, {
      frameWidth: 138,
      frameHeight: 230,
    });
    this.screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.downSfx = this.sound.add('buttonclick');
    this.overSfx = this.sound.add('buttonhover');

    this.add
      .image(this.screenCenterX, this.screenCenterY, 'background')
      .setScale(0.85);
    const closeButton = new Button(
      this,
      this.screenCenterX + 390,
      this.screenCenterY - 240,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setDepth(800)
      .setScale(0.6)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    closeButton.on('pointerup', () => {
      this.scene.stop('QuestScene');
      this.scene.resume('HabitatHeroesScene');
    });

    this.add.existing(closeButton);
    this.addQuests();
  }

  addQuests() {
    const panelsX = [580, 800, 1020];

    for (let i = 0; i < 3; i += 1) {
      this.addQuest(i, panelsX[i]);
    }
  }

  addQuest(i, x) {
    let relevantState;
    let callback;
    let questText;
    let image;
    const y = 465;
    switch (i) {
      case 0:
        relevantState = store.getState().quest.hasBuiltHouse;
        callback = () => {
          this.scene.stop('QuestScene');
          this.scene.launch('BuildMenuScene');
        };
        questText = 'Build a\nHouse';
        image = 'basichut';
        break;
      case 1:
        relevantState = store.getState().quest.hasPurchasedFromShop;
        callback = () => {
          this.scene.stop('QuestScene');
          this.scene.launch('ShopScene');
        };
        questText = 'Purchase from\nthe Shop';
        image = 'hfhflag';
        break;
      default:
        relevantState = store.getState().quest.hasSharedOnSocialMedia;
        callback = () => {
          this.scene.stop('QuestScene');
          this.scene.launch('SharePageScene');
        };
        questText = 'Share on\nSocial Media';
        image = 'facebook';
    }
    const panel = this.add.image(x, y, 'baseboard');
    panel.scale = 0.8;

    const questName = this.add.text(x, y - 150, questText, {
      fontFamily: 'Graduate',
      fontSize: 22,
      color: '#fff',
      strokeThickness: 1,
      align: 'center',
    });
    questName.setOrigin(0.5, 0);
    questName.setWordWrapWidth(200);

    const imageSprite = this.add.image(x, y, image);
    if (imageSprite.height > 200) {
      imageSprite.displayHeight = 200;
    }
    if (imageSprite.displayWidth > 200) {
      imageSprite.displayWidth = 200;
    }

    const button = new Button(this, x, y + 130, 'longbutton')
      .setDownTexture('longbutton')
      .setButtonName('Do Quest!')
      .setScale(0.3)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx)
      .setDisabled(relevantState);
    button.on('pointerup', callback);
    this.add.existing(button);

    const buttonText = this.add.text(x, y + 112, "Let's Go!", {
      fontFamily: 'Graduate',
      fontSize: 22,
      color: '#fff',
      strokeThickness: 1,
      align: 'center',
    });
    buttonText.setOrigin(0.5, 0);

    if (relevantState) {
      questName.setAlpha(0.8);
      imageSprite.setAlpha(0.8);
      button.setAlpha(0.8);
      buttonText.setAlpha(0.8);

      const completedImage = this.add.image(x + 5, y, 'completed');
      completedImage.scale = 0.3;
    }
  }
}
