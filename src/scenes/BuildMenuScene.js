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
  }

  create() {
    scene = this;
    scene.add
      .image(screenCenterX, screenCenterY + 10, 'buildmenu')
      .setScale(0.75);
    const buildBasicHutButton = new Button(
      scene,
      screenCenterX - 210,
      screenCenterY + 190,
      'freebutton',
    ).setDownTexture('freebutton');
    buildBasicHutButton.depth = 100;
    buildBasicHutButton.scale = 0.8;
    buildBasicHutButton.setButtonName('Build Basic Hut');
    buildBasicHutButton.on('pointerup', () => {
      if (store.getState().houses.total_house === 0) {
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
    if (
      !(
        store.getState().houses.basic_hut === 0 &&
        store.getState().houses.total_house === 0
      )
    ) {
      buildBasicHutButton.setDisabled(true);
    }

    const buildBrickHouseButton = new Button(
      scene,
      screenCenterX + 5,
      screenCenterY + 190,
      'freebutton',
    ).setDownTexture('freebutton');
    buildBrickHouseButton.scale = 0.8;
    buildBrickHouseButton.setButtonName('Build Brick House');
    buildBrickHouseButton.on('pointerup', () => {
      if (
        store.getState().houses.total_house === 1 &&
        store.getState().houses.basic_hut === 1
      ) {
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
    if (store.getState().houses.basic_hut === 0) {
      buildBrickHouseButton.setDisabled(true);
    }

    const buildConcreteHouseButton = new Button(
      scene,
      screenCenterX + 230,
      screenCenterY + 190,
      'purchasebutton',
    ).setDownTexture('purchasebutton');
    buildConcreteHouseButton.scale = 0.8;
    buildConcreteHouseButton.setButtonName('Build Concrete House');
    buildConcreteHouseButton.on('pointerup', () => {
      const state = store.getState();
      if (
        state.houses.total_house === 1 &&
        state.houses.brick_house === 1 &&
        state.coins.amount >= 5000
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
    if (store.getState().houses.brick_house === 0) {
      buildConcreteHouseButton.setDisabled(true);
    }

    const closeButton = new Button(
      scene,
      screenCenterX + 330,
      screenCenterY - 220,
      'closebutton',
    ).setDownTexture('closebutton');
    closeButton.scale = 0.5;
    closeButton.setButtonName('Close');
    closeButton.on('pointerup', () => {
      this.scene.stop('BuildMenuScene');
      this.scene.resume('HabitatHeroesScene');
    });

    const resetButton = new Button(
      scene,
      screenCenterX + 300,
      screenCenterY - 150,
      'resetbutton',
    ).setDownTexture('resetbutton');
    resetButton.scale = 0.2;
    resetButton.setButtonName('Reset');
    resetButton.on('pointerup', () => {
      store.dispatch(resetHouses());
      this.scene.get('HabitatHeroesScene').removeHouse();
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
