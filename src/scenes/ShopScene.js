import Phaser from 'phaser';

import coinimage from '../assets/coins/coin.png';
import closebutton from '../assets/game_menu/close_button.png';
import buybutton from '../assets/game_menu/long_button.png';
import nextbutton from '../assets/game_menu/next_button.png';
import prevbutton from '../assets/game_menu/prev_button.png';
import baseboard from '../assets/game_menu/vertical_baseboard.png';
import background from '../assets/game_menu/woodboard_no_cblogo.png';
import trees from '../assets/tree_tiles.png';
import Button from '../objects/Button';
import { decreaseByAmount } from '../reducers/coinsReducer';
import { addToInventory } from '../reducers/inventoryReducer';
import store from '../store';
import ITEMS from '../utils/items';

const modulo = (val, n) => ((val % n) + n) % n;

export class ShopScene extends Phaser.Scene {
  screenCenterX;

  screenCenterY;

  prevButton;

  nextButton;

  panels;

  pageIdx;

  currentAmt;

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
    this.load.image('background', background);
    this.load.image('closebutton', closebutton);
    this.load.image('prevbutton', prevbutton);
    this.load.image('nextbutton', nextbutton);
    this.load.image('baseboard', baseboard);
    this.load.image('buybutton', buybutton);
    this.load.image('coinimage', coinimage);

    this.load.spritesheet('trees', trees, {
      frameWidth: 120,
      frameHeight: 171,
    });

    this.screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.add
      .image(this.screenCenterX, this.screenCenterY + 10, 'background')
      .setScale(0.85);

    this.add.text(640, 100, 'Shop', {
      fontFamily: 'Graduate',
      fontSize: 90,
      color: '#fff',
      strokeThickness: 2,
    });

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
    ).setDownTexture('closebutton');
    closeButton.depth = 800;
    closeButton.scale = 0.6;
    closeButton.setButtonName('Close');
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
    ).setDownTexture('prevbutton');
    this.prevButton.scale = 0.4;
    this.prevButton.depth = 800;
    this.prevButton.setButtonName('Previous Page');
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
    ).setDownTexture('nextbutton');
    this.nextButton.scale = 0.4;
    this.nextButton.depth = 800;
    this.nextButton.setButtonName('Next Page');
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
    const panel = this.add.image(x, y, 'baseboard');
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

    const button = new Button(this, x, y + 130, 'buybutton').setDownTexture(
      'buybutton',
    );
    button.scale = 0.3;
    button.setButtonName('Buy');
    button.on('pointerup', () => {
      store.dispatch(decreaseByAmount(cost));
      const purchased = {};
      purchased[itemId] = 1;
      store.dispatch(addToInventory(purchased));
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
      Object.values(panel).forEach((obj) => obj.destroy?.());
    });
  }
}
