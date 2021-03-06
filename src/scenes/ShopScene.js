import Phaser from 'phaser';

import coinimage from '../assets/coins/coin.png';
import closebutton from '../assets/game_menu/close_button.png';
import buybutton from '../assets/game_menu/long_button.png';
import nextbutton from '../assets/game_menu/next_button.png';
import prevbutton from '../assets/game_menu/prev_button.png';
import shopbaseboard from '../assets/game_menu/vertical_baseboard.png';
import shopboard from '../assets/shop/ShopboardBase.png';
import Button from '../objects/Button';
import { decreaseByAmount } from '../reducers/coinsReducer';
import { addToInventory } from '../reducers/inventoryReducer';
import { updateQuests } from '../reducers/questReducer';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import purchase from '../sounds/purchase.mp3';
import success from '../sounds/success.mp3';
import store from '../store';
import { DEFAULT_SFX_CONFIG } from '../utils/constants';
import ITEMS, { loadItemSprites } from '../utils/items';
import { modulo } from '../utils/utilFunctions';

export class ShopScene extends Phaser.Scene {
  screenCenterX;

  screenCenterY;

  prevButton;

  nextButton;

  panels;

  pageIdx;

  currentAmt;

  downSfx;

  overSfx;

  purchaseSfx;

  successSfx;

  // eslint-disable-next-line class-methods-use-this
  selectAmt = (state) => state.coins.amount;

  handleAmtChange = () => {
    this.currentAmt = this.selectAmt(store.getState());

    // disable buy buttons if price go below cost of item
    this.panels.forEach((panel) => {
      if (panel?.cost > this.currentAmt) {
        panel?.button?.setDisabled(true);
      }
    });
  };

  constructor() {
    super({
      key: 'ShopScene',
    });

    this.#setUpStore();
    this.panels = [null, null, null];
    this.pageIdx = 0;
  }

  #setUpStore() {
    this.currentAmt = this.selectAmt(store.getState());
    store.subscribe(this.handleAmtChange);
  }

  preload() {
    this.load.image('shopboard', shopboard);
    this.load.image('closebutton', closebutton);
    this.load.image('prevbutton', prevbutton);
    this.load.image('nextbutton', nextbutton);
    this.load.image('shopbaseboard', shopbaseboard);
    this.load.image('buybutton', buybutton);
    this.load.image('coinimage', coinimage);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.audio('purchase', purchase);
    this.load.audio('success', success);

    loadItemSprites(this);

    this.screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.downSfx = this.sound.add('buttonclick');
    this.overSfx = this.sound.add('buttonhover');
    this.purchaseSfx = this.sound.add('purchase');
    this.successSfx = this.sound.add('success');

    this.add
      .image(this.screenCenterX, this.screenCenterY + 10, 'shopboard')
      .setScale(0.85);

    this.#addCloseButton();
    this.#addNavButtons();
    this.#addPanels();
  }

  #addCloseButton() {
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
      this.scene.stop('ShopScene');
      this.scene.resume('HabitatHeroesScene');
    });
    this.add.existing(closeButton);
  }

  #addNavButtons() {
    this.prevButton = new Button(
      this,
      this.screenCenterX - 360,
      this.screenCenterY + 50,
      'prevbutton',
    )
      .setDownTexture('prevbutton')
      .setButtonName('Previous Page')
      .setDepth(800)
      .setScale(0.4)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.prevButton.on('pointerup', () => {
      this.pageIdx = modulo(this.pageIdx - 1, Math.ceil(ITEMS.length / 3));
      this.#destroyPanels();
      this.#addPanels();
    });
    this.add.existing(this.prevButton);

    this.nextButton = new Button(
      this,
      this.screenCenterX + 368,
      this.screenCenterY + 50,
      'nextbutton',
    )
      .setDownTexture('nextbutton')
      .setButtonName('Next Page')
      .setDepth(800)
      .setScale(0.4)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.nextButton.on('pointerup', () => {
      this.pageIdx = modulo(this.pageIdx + 1, Math.ceil(ITEMS.length / 3));
      this.#destroyPanels();
      this.#addPanels();
    });
    this.add.existing(this.nextButton);
  }

  #addPanel(panelIdx, x, itemId) {
    const { name, spritesheet, frame, cost } = ITEMS[itemId];
    const y = 465;
    const panel = this.add.image(x, y, 'shopbaseboard');
    panel.scale = 0.8;

    const itemName = this.add.text(x, y - 150, name, {
      fontFamily: 'Graduate',
      fontSize: 22,
      color: '#fff',
      strokeThickness: 1,
      align: 'center',
    });
    itemName.setOrigin(0.5, 0);
    itemName.setWordWrapWidth(200);

    const image = this.add.image(x, y, spritesheet, frame);
    if (image.height > 200) {
      image.displayHeight = 200;
    }
    if (image.displayWidth > 200) {
      image.displayWidth = 200;
    }

    const button = new Button(this, x, y + 130, 'buybutton')
      .setDownTexture('buybutton')
      .setButtonName('Buy')
      .setScale(0.3)
      .setDownSfx(this.purchaseSfx)
      .setOverSfx(this.overSfx);
    button.on('pointerup', () => {
      if (!store.getState().quest.hasPurchasedFromShop) {
        this.successSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateQuests({ hasPurchasedFromShop: true }));
      }
      store.dispatch(decreaseByAmount(cost));
      store.dispatch(addToInventory({ [itemId]: 1 }));
    });
    this.add.existing(button);

    if (cost > this.currentAmt) {
      button.setDisabled(true);
    }

    const coinImage = this.add.image(x - 60, y + 128, 'coinimage');
    coinImage.scale = 0.2;

    const costText = this.add.text(x + 10, y + 112, `${cost}`, {
      fontFamily: 'Graduate',
      fontSize: 22,
      color: '#fff',
      strokeThickness: 1,
      align: 'center',
    });
    costText.setOrigin(0.5, 0);

    this.panels[panelIdx] = {
      panel,
      itemName,
      image,
      button,
      coinImage,
      costText,
      cost,
    };
  }

  #addPanels() {
    const panelsX = [580, 800, 1020];

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      const itemId = this.pageIdx * 3 + i;
      if (itemId >= ITEMS.length) {
        break;
      }
      this.#addPanel(i, panelsX[i], itemId);
    }
  }

  #destroyPanels() {
    this.panels?.forEach((panel) => {
      Object.values(panel ?? {}).forEach((obj) => obj?.destroy?.());
    });
  }
}
