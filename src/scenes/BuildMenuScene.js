import Phaser from 'phaser';

import buildmenu from '../assets/build_menu/BuildMenuBase.png';
import freebutton from '../assets/build_menu/BuildMenuFreeButton.png';
import purchasebutton from '../assets/build_menu/BuildMenuPurchaseButton.png';
import closebutton from '../assets/game_menu/close_button.png';
import resetbutton from '../assets/game_menu/refresh_button.png';
import Button from '../objects/Button';
import { decreaseByAmount } from '../reducers/coinsReducer';
import {
  HouseType,
  resetHouses,
  updateHouse,
  UserAction,
} from '../reducers/houseReducer';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import store from '../store';

let scene;

let screenCenterX;
let screenCenterY;

export class BuildMenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BuildMenuScene',
    });
  }

  preload() {
    this.load.image('buildmenu', buildmenu);
    this.load.image('freebutton', freebutton);
    this.load.image('purchasebutton', purchasebutton);
    this.load.image('closebutton', closebutton);
    this.load.image('resetbutton', resetbutton);
    screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
  }

  create() {
    scene = this;
    const downSfx = this.sound.add('buttonclick');
    const overSfx = this.sound.add('buttonhover');
    const { houses } = store.getState();

    scene.add
      .image(screenCenterX, screenCenterY + 10, 'buildmenu')
      .setScale(0.75);
    const buildBasicHutButton = new Button(
      scene,
      screenCenterX - 210,
      screenCenterY + 190,
      'freebutton',
    )
      .setDownTexture('freebutton')
      .setButtonName('Build Basic Hut')
      .setDepth(100)
      .setScale(0.8)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    buildBasicHutButton.on('pointerup', () => {
      if (houses.total_house === 0) {
        store.dispatch(
          updateHouse({
            houseType: HouseType.basic_hut,
            userAction: UserAction.build,
          }),
        );
        this.scene.get('HabitatHeroesScene').placeHouses();
        this.scene.stop('BuildMenuScene');
        this.scene.resume('HabitatHeroesScene');
      }
    });
    if (!(houses.basic_hut === 0 && houses.total_house === 0) || houses.building) {
      buildBasicHutButton.setDisabled(true);
    }

    const buildBrickHouseButton = new Button(
      scene,
      screenCenterX + 5,
      screenCenterY + 190,
      'freebutton',
    )
      .setDownTexture('freebutton')
      .setButtonName('Build Brick House')
      .setScale(0.8)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    buildBrickHouseButton.on('pointerup', () => {
      if (houses.total_house === 1 && houses.basic_hut === 1) {
        store.dispatch(
          updateHouse({
            houseType: HouseType.basic_hut,
            userAction: UserAction.upgrade,
            upgradeHouseType: HouseType.brick_house,
          }),
        );
        this.scene.get('HabitatHeroesScene').removeHouse();
        this.scene.get('HabitatHeroesScene').placeHouses();
        this.scene.stop('BuildMenuScene');
        this.scene.resume('HabitatHeroesScene');
      }
    });
    if (houses.basic_hut === 0 || houses.building) {
      buildBrickHouseButton.setDisabled(true);
    }

    const buildConcreteHouseButton = new Button(
      scene,
      screenCenterX + 230,
      screenCenterY + 190,
      'purchasebutton',
    )
      .setDownTexture('purchasebutton')
      .setButtonName('Build Concrete House')
      .setScale(0.8)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    buildConcreteHouseButton.on('pointerup', () => {
      if (
        houses.total_house === 1 &&
        houses.brick_house === 1 &&
        store.getState().coins.amount >= 5000
      ) {
        store.dispatch(decreaseByAmount(5000));
        store.dispatch(
          updateHouse({
            houseType: HouseType.brick_house,
            userAction: UserAction.upgrade,
            upgradeHouseType: HouseType.concrete_house,
          }),
        );
        this.scene.get('HabitatHeroesScene').removeHouse();
        this.scene.get('HabitatHeroesScene').placeHouses();
        this.scene.stop('BuildMenuScene');
        this.scene.resume('HabitatHeroesScene');
      }
    });
    if (houses.brick_house === 0 || houses.building) {
      buildConcreteHouseButton.setDisabled(true);
    }

    const closeButton = new Button(
      scene,
      screenCenterX + 330,
      screenCenterY - 220,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setScale(0.5)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    closeButton.on('pointerup', () => {
      this.scene.stop('BuildMenuScene');
      this.scene.resume('HabitatHeroesScene');
    });

    const resetButton = new Button(
      scene,
      screenCenterX + 300,
      screenCenterY - 150,
      'resetbutton',
    )
      .setDownTexture('resetbutton')
      .setButtonName('Reset')
      .setScale(0.2)
      .setDownSfx(downSfx)
      .setOverSfx(overSfx);
    resetButton.on('pointerup', () => {
      store.dispatch(resetHouses());
      this.scene.get('HabitatHeroesScene').removeHouse();
      this.scene.get('HabitatHeroesScene').destroyTimer();
      this.scene.stop('BuildMenuScene');
      this.scene.resume('HabitatHeroesScene');
    });

    scene.add.existing(closeButton);
    scene.add.existing(resetButton);
    scene.add.existing(buildBasicHutButton);
    scene.add.existing(buildBrickHouseButton);
    scene.add.existing(buildConcreteHouseButton);
  }
}
