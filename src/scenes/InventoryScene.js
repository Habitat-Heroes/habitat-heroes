import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import placebutton from '../assets/game_menu/long_button.png';
import nextbutton from '../assets/game_menu/next_button.png';
import prevbutton from '../assets/game_menu/prev_button.png';
import baseboard from '../assets/game_menu/vertical_baseboard.png';
import inventorybase from '../assets/shop/InventoryboardBase.png';
import Button from '../objects/Button';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import store from '../store';
import ITEMS, { loadItemSprites } from '../utils/items';
import { modulo } from '../utils/utilFunctions';

export class InventoryScene extends Phaser.Scene {
  screenCenterX;

  screenCenterY;

  prevButton;

  nextButton;

  panels;

  pageIdx;

  currentInv;

  downSfx;

  overSfx;

  // eslint-disable-next-line class-methods-use-this
  selectInv = (state) => state.inventory;

  handleInvChange = () => {
    this.currentInv = this.selectInv(store.getState());
  };

  constructor() {
    super({
      key: 'InventoryScene',
    });

    this.#setUpStore();
    this.panels = [null, null, null];
    this.pageIdx = 0;
  }

  #setUpStore() {
    this.currentInv = this.selectInv(store.getState());
    store.subscribe(this.handleInvChange);
  }

  preload() {
    this.load.image('inventorybase', inventorybase);
    this.load.image('closebutton', closebutton);
    this.load.image('prevbutton', prevbutton);
    this.load.image('nextbutton', nextbutton);
    this.load.image('baseboard', baseboard);
    this.load.image('placebutton', placebutton);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);

    loadItemSprites(this);

    this.screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.downSfx = this.sound.add('buttonclick');
    this.overSfx = this.sound.add('buttonhover');

    this.add
      .image(this.screenCenterX, this.screenCenterY + 10, 'inventorybase')
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
      this.scene.stop('InventoryScene');
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
      this.pageIdx = modulo(
        this.pageIdx - 1,
        Math.ceil(Object.keys(this.currentInv).length / 3),
      );
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
      .setScale(0.4)
      .setDepth(800)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.nextButton.on('pointerup', () => {
      this.pageIdx = modulo(
        this.pageIdx + 1,
        Math.ceil(Object.keys(this.currentInv).length / 3),
      );
      this.#destroyPanels();
      this.#addPanels();
    });
    this.add.existing(this.nextButton);

    if (Object.keys(this.currentInv).length <= 3) {
      this.prevButton.setDisabled(true);
      this.nextButton.setDisabled(true);
    }
  }

  #addPanel(panelIdx, x, itemId, qty) {
    const { name, spritesheet, frame, offsetX, offsetY, cells } = ITEMS[itemId];
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
    if (image.height > 200) {
      image.displayHeight = 200;
    }
    if (image.displayWidth > 200) {
      image.displayWidth = 200;
    }

    const button = new Button(this, x + 44, y + 130, 'placebutton')
      .setDownTexture('placebutton')
      .setButtonName('Place')
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    button.scaleY = 0.3;
    button.scaleX = 0.15;
    button.on('pointerup', () => {
      this.scene.stop('InventoryScene');
      this.scene.resume('HabitatHeroesScene', {
        spritesheet,
        frame,
        itemId,
        offsetX,
        offsetY,
        cells,
      });
    });
    this.add.existing(button);

    const placeText = this.add.text(x + 44, y + 112, 'Place', {
      fontFamily: 'Graduate',
      fontSize: 22,
      color: '#fff',
      strokeThickness: 1,
      align: 'center',
    });
    placeText.setOrigin(0.5, 0);

    const qtyText = this.add.text(x - 44, y + 112, `x ${qty}`, {
      fontFamily: 'Graduate',
      fontSize: 22,
      color: '#fff',
      strokeThickness: 1,
      align: 'center',
    });
    qtyText.setOrigin(0.5, 0);

    this.panels[panelIdx] = {
      panel,
      itemName,
      image,
      button,
      placeText,
      qtyText,
    };
  }

  #addPanels() {
    const panelsX = [580, 800, 1020];

    const invItems = Object.entries(this.currentInv).sort(
      (a, b) => a[0] - b[0],
    ); // sort by item ID

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 3; i++) {
      const invIdx = this.pageIdx * 3 + i;
      if (invIdx >= invItems.length) {
        break;
      }
      const [itemId, qty] = invItems[invIdx];
      this.#addPanel(i, panelsX[i], itemId, qty);
    }
  }

  #destroyPanels() {
    this.panels?.forEach((panel) => {
      Object.values(panel ?? {}).forEach((obj) => obj?.destroy?.());
    });
  }
}
