import Phaser from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric';

import avatarpanelwithoutlucas from '../assets/avatar/AvatarPanel_NoAvatar.png';
import avatarpanel from '../assets/avatar/AvatarPanelLucas_NoText.png';
import avatar from '../assets/avatar2.png';
import basichut from '../assets/basic_hut.png';
import brickhouse from '../assets/brick_house.png';
import cbsprite from '../assets/coins/coins_panel.png';
import concretehouse from '../assets/concrete_house.png';
import bbsprite from '../assets/game_menu/build_button.png';
import ibsprite from '../assets/game_menu/inventory_button.png';
import nbsprite from '../assets/game_menu/news_button.png';
import qbsprite from '../assets/game_menu/quest_button.png';
import shbsprite from '../assets/game_menu/share_button.png';
import sbsprite from '../assets/game_menu/shop_button.png';
import buildingstate from '../assets/house_struct.png';
import mapjson from '../assets/isometric-grass-and-water.json';
import tiles from '../assets/isometric-grass-and-water.png';
import zerobar from '../assets/loading_bar/0bar.png';
import onebar from '../assets/loading_bar/1bar.png';
import twobar from '../assets/loading_bar/2bar.png';
import threebar from '../assets/loading_bar/3bar.png';
import fourbar from '../assets/loading_bar/4bar.png';
import fivebar from '../assets/loading_bar/5bar.png';
import trees from '../assets/tree_tiles.png';
import { Avatar } from '../objects/Avatar';
import BuildButton from '../objects/BuildButton';
import CoinsButton from '../objects/CoinsButton';
import InventoryButton from '../objects/InventoryButton';
import NewsButton from '../objects/NewsButton';
import QuestButton from '../objects/QuestButton';
import ShareButton from '../objects/ShareButton';
import ShopButton from '../objects/ShopButton';
import { updateBuildTime } from '../reducers/houseReducer';
import { removeFromInventory } from '../reducers/inventoryReducer';
import {addToMap} from '../reducers/mapItemsReducer';
import building from '../sounds/building.mp3';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import footstep from '../sounds/footstep.mp3';
import mainbgm from '../sounds/mainbgm.mp3';
import openmenu from '../sounds/openmenu.mp3';
import reward from '../sounds/reward.mp3';
import store from '../store';
import {
  AVATAR_PANEL_CENTER,
  BUILD_DIRECTION_MAPPING,
  DEFAULT_SFX_CONFIG,
  HOUSE_STRUCT_IMAGE,
  MAP_HEIGHT,
  MAP_LAYOUT,
  MAP_WIDTH,
  TILE_HEIGHT_HALF,
  TILE_WIDTH_HALF,
} from '../utils/constants';
import checkInMovableRange, {convertSecondsToText, getRemainingBuildTime} from '../utils/GameUtils';
import { loadItemSprites } from '../utils/items';

let player;
let house;
let buildFrame = 100;
let buildDirection = 0;
let timerText;
let buildTimerBarImage;
let currentBuildTimerBar;

let pointer;

let scene;
let touchX;
let touchY;

let name;
let donations;
let nameText;
let donationText;

let bgm;

const centerX = MAP_WIDTH * TILE_WIDTH_HALF;
const centerY = MAP_HEIGHT * TILE_HEIGHT_HALF * 0.3;

const USE_ACTUAL_AVATAR_SPRITE = false;

export class HabitatHeroesScene extends Phaser.Scene {
  buildingSfx;

  rewardSfx;

  constructor() {
    super({
      key: 'HabitatHeroesScene',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' },
    });
  }

  preload() {
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso',
    });

    this.load.json('map', mapjson);
    this.load.spritesheet('tiles', tiles, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('trees', trees, {
      frameWidth: 120,
      frameHeight: 171,
    });
    this.load.spritesheet('avatar', avatar, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('0bar', zerobar);
    this.load.image('1bar', onebar);
    this.load.image('2bar', twobar);
    this.load.image('3bar', threebar);
    this.load.image('4bar', fourbar);
    this.load.image('5bar', fivebar);
    this.load.image('buildingstate', buildingstate);
    this.load.image('basichut', basichut);
    this.load.image('brickhouse', brickhouse);
    this.load.image('concretehouse', concretehouse);
    this.load.image('buildbutton', bbsprite);
    this.load.image('newsbutton', nbsprite);
    this.load.image('inventorybutton', ibsprite);
    this.load.image('questbutton', qbsprite);
    this.load.image('shopbutton', sbsprite);
    this.load.image('sharebutton', shbsprite);
    this.load.image('coinsbutton', cbsprite);
    this.load.image(
      'avatarpanel',
      USE_ACTUAL_AVATAR_SPRITE ? avatarpanelwithoutlucas : avatarpanel,
    );
    this.load.audio('mainbgm', mainbgm);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.audio('footstep', footstep);
    this.load.audio('building', building);
    this.load.audio('reward', reward);
    this.load.audio('openmenu', openmenu);
    loadItemSprites(this);
  }

  create() {
    scene = this;

    bgm = this.sound.add('mainbgm');
    bgm.play({
      ...DEFAULT_SFX_CONFIG,
      loop: true,
      volume: 0.5,
    });
    const downSfx = this.sound.add('buttonclick');
    const overSfx = this.sound.add('buttonhover');
    const openMenuSfx = this.sound.add('openmenu');
    const footstepSfx = this.sound.add('footstep');
    this.buildingSfx = this.sound.add('building');
    this.rewardSfx = this.sound.add('reward');

    this.buildMap();
    this.placeHouses();
    this.addAvatarPanel();

    player = new Avatar(
      scene,
      centerX - 100,
      centerY + 100,
      'avatar',
      {
        key: 'avatar',
        frame: 0,
      },
      footstepSfx,
    ).player;
    player.depth = centerY + 164;
    touchY = centerY + 100;
    touchX = centerX - 100;
    pointer = scene.input.activePointer;

    scene.add.existing(BuildButton(this, openMenuSfx, overSfx));
    scene.add.existing(InventoryButton(this, openMenuSfx, overSfx));
    scene.add.existing(NewsButton(this, openMenuSfx, overSfx));
    scene.add.existing(QuestButton(this, openMenuSfx, overSfx));
    scene.add.existing(ShopButton(this, openMenuSfx, overSfx));
    scene.add.existing(ShareButton(this, openMenuSfx, overSfx));
    scene.add.existing(CoinsButton(this, downSfx, overSfx));

    Object.entries(store.getState().mapItems).forEach( (_k, item) => {
      this.add.image(
        item.coordinates[0],
        item.coordinates[1],
        item.spritesheet,
        item.frame,
      ).setDepth(item.depth);
    });

    this.events.on('resume', (_scene, data) => {
      if (data == null) {
        return;
      }

      const { spritesheet, frame, itemId } = data;
      const placingItemImage = this.add.image(
        this.input.x + this.cameras.main.scrollX,
        this.input.y + this.cameras.main.scrollY,
        spritesheet,
        frame,
      );
      placingItemImage.depth = 800;
      placingItemImage.setAlpha(0.6);
      const placingItemFn = (movingPointer) => {
        placingItemImage.setPosition(movingPointer.x, movingPointer.y);
      };
      this.input.on('pointermove', placingItemFn);

      // TODO someway to cancel placing item

      this.input.once('pointerup', () => {
        placingItemImage.setAlpha(1).setDepth(pointer.y + 110);
        this.input.off('pointermove', placingItemFn);
        store.dispatch(addToMap(
          {
            coordinates: [pointer.x, pointer.y],
            depth: pointer.y + 110,
            spritesheet,
            frame
          }
        ));
        store.dispatch(removeFromInventory({ [itemId]: 1 }));
      });
    });
  }

  update() {
    if (getRemainingBuildTime(store.getState().houses) > 0 || store.getState().houses.building) {
      this.updateBuilding();
      return;
    }

    if (pointer.isDown && checkInMovableRange(pointer.x, pointer.y)) {
      touchX = pointer.x;
      touchY = pointer.y;
    }

    if (touchY === player.y && touchX === player.x) {
      player.scene.time.delayedCall(
        0.15 * 1000,
        () => {
          player.anims.play('still', true);
        },
        [],
        this,
      );
    } else {
      this.walkToPoint(touchX, touchY);
    }
  }

  /* eslint-disable class-methods-use-this */
  destroyTimer() {
    if (timerText != null) {
      timerText.destroy();
      timerText = null;
    }
    buildTimerBarImage.destroy();
  }

  updateBuilding() {
    if (
      player.x === BUILD_DIRECTION_MAPPING[buildDirection][0] &&
      player.y === BUILD_DIRECTION_MAPPING[buildDirection][1]
    ) {
      if (!this.buildingSfx.isPlaying) {
        this.buildingSfx.play({ ...DEFAULT_SFX_CONFIG, loop: true });
      }
      this.animateBuilding();
    } else {
      this.walkToPoint(
        BUILD_DIRECTION_MAPPING[buildDirection][0],
        BUILD_DIRECTION_MAPPING[buildDirection][1],
      );
    }

    const { houses } = store.getState();
    const remainingBuildTime = getRemainingBuildTime(houses);
    this.updateBuildTimerBar(houses.buildTime, remainingBuildTime);
    if (remainingBuildTime <= 0 && timerText != null) {
      this.buildingSfx.stop();
      this.destroyTimer();
      this.removeHouse();
      player.scene.time.delayedCall(
        100,
        () => {
          this.placeHouses();
          scene.scene.launch('ThankYouScene');
          scene.scene.pause('HabitatHeroesScene');
          this.rewardSfx.play(DEFAULT_SFX_CONFIG);
        },
        [],
        this,
      );
    } else if (timerText == null) {
      timerText = scene.add
        .text(
          HOUSE_STRUCT_IMAGE[0] - 100,
          HOUSE_STRUCT_IMAGE[1] - 200,
          remainingBuildTime,
          {
            fontFamily: 'Graduate',
            fontSize: 18,
            color: '#fff',
            align: 'left',
            strokeThickness: 2,
          },
        )
        .setShadow(2, 2, '#333333', 2, false, true);
      timerText.depth = 850;
    } else {
      timerText.setText(convertSecondsToText(remainingBuildTime));
    }
    store.dispatch(updateBuildTime());
  }

  updateBuildTimerBar(totalBuildTime, remainingBuildTime) {
    function between(x, min, max) {
      return x >= min && x <= max;
    }

    let buildTimerBar;
    const buildFrac = remainingBuildTime / totalBuildTime;
    if (between(buildFrac, 0, 0.05)) {
      buildTimerBar = '0bar';
    } else if (between(buildFrac, 0.05, 0.2)) {
      buildTimerBar = '1bar';
    } else if (between(buildFrac, 0.2, 0.4)) {
      buildTimerBar = '2bar';
    } else if (between(buildFrac, 0.4, 0.6)) {
      buildTimerBar = '3bar';
    } else if (between(buildFrac, 0.6, 0.95)) {
      buildTimerBar = '4bar';
    } else {
      buildTimerBar = '5bar';
    }

    if (
      currentBuildTimerBar != null &&
      currentBuildTimerBar === buildTimerBar
    ) {
      return;
    }

    if (currentBuildTimerBar == null) {
      buildTimerBarImage = scene.add.image(
        HOUSE_STRUCT_IMAGE[0],
        HOUSE_STRUCT_IMAGE[1] - 150,
        buildTimerBar,
      );
      buildTimerBarImage.depth = 850;
      buildTimerBarImage.scale = 0.4;
      currentBuildTimerBar = buildTimerBar;
    } else {
      buildTimerBarImage.destroy();
      currentBuildTimerBar = buildTimerBar;
      buildTimerBarImage = scene.add.image(
        HOUSE_STRUCT_IMAGE[0],
        HOUSE_STRUCT_IMAGE[1] - 150,
        buildTimerBar,
      );
      buildTimerBarImage.scale = 0.4;
      buildTimerBarImage.depth = 850;
    }
  }

  walkToPoint(x, y) {
    if (y > player.y) {
      player.anims.play('up', true);
      player.y += y > player.y + 2 ? 2 : y - player.y;
      player.depth = player.y + 48;
      return;
    }
    if (y < player.y) {
      player.anims.play('down', true);
      player.y -= y + 2 < player.y ? 2 : player.y - y;
      player.depth = player.y + 64;
      return;
    }

    if (x > player.x) {
      player.anims.play('right', true);
      player.x += x > player.x + 2 ? 2 : x - player.x;
    } else if (x < player.x) {
      player.anims.play('left', true);
      player.x -= x < player.x - 2 ? 2 : player.x - x;
    }
  }

  buildMap() {
    function buildLand() {
      let i = 0;
      for (let y = -10; y < MAP_HEIGHT + 10; y += 1) {
        for (let x = -10; x < MAP_WIDTH + 10; x += 1) {
          let id = Math.floor(Math.random() * 6);
          if (x > 0 && y > 0 && x < MAP_WIDTH && y < MAP_HEIGHT) {
            id = MAP_LAYOUT[i] - 1;
            i += 1;
          }
          const tx = (x - y) * TILE_WIDTH_HALF;
          const ty = (x + y) * TILE_HEIGHT_HALF;
          const tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);
          tile.depth = centerY + ty;
        }
      }
    }

    function placeTrees() {
      for (let y = -10; y < MAP_HEIGHT; y += 2) {
        for (let x = -15; x < -3; x += 3) {
          const tx = (x - y) * TILE_WIDTH_HALF;
          const ty = (x + y) * TILE_HEIGHT_HALF;
          const tile = scene.add.image(centerX + tx, centerY + ty, 'trees', 5);
          tile.depth = centerY + ty + 64;
        }
      }

      for (let x = -10; x < MAP_WIDTH; x += 2) {
        for (let y = -15; y < -3; y += 3) {
          const tx = (x - y) * TILE_WIDTH_HALF;
          const ty = (x + y) * TILE_HEIGHT_HALF;
          const tile = scene.add.image(centerX + tx, centerY + ty, 'trees', 5);
          tile.depth = centerY + ty + 64;
        }
      }
    }

    buildLand();
    placeTrees();
  }

  #roundToTwo(num) {
    return +`${Math.round(`${num}e+2`)}e-2`;
  }

  addAvatarPanel() {
    const [x, y] = AVATAR_PANEL_CENTER;
    const panel = scene.add.image(x, y, 'avatarpanel').setScale(0.2);
    panel.depth = 800;

    if (USE_ACTUAL_AVATAR_SPRITE) {
      const panelAvatar = new Avatar(scene, x - 71, y - 8, 'avatar', {
        key: 'avatar',
        frame: 0,
      }).player;
      panelAvatar.depth = 850;
      panelAvatar.setScale(0.8);
    }

    name = store.getState().user.name;
    donations = store.getState().user.donations;

    nameText = scene.add
      .text(x - 35, y - 23, name, {
        fontFamily: 'Graduate',
        fontSize: 18,
        color: '#fff',
        align: 'left',
        strokeThickness: 2,
      })
      .setShadow(2, 2, '#333333', 2, false, true);
    nameText.depth = 850;
    donationText = scene.add
      .text(x - 35, y, `Donations: SGD ${this.#roundToTwo(donations)}`, {
        fontFamily: 'Graduate',
        fontSize: 12,
        color: '#fff',
        align: 'left',
        strokeThickness: 2,
      })
      .setShadow(2, 2, '#333333', 2, false, true);
    donationText.depth = 850;

    const handleUserChange = () => {
      const previousName = name;
      name = store.getState().user.name;
      if (nameText != null && previousName !== name) {
        nameText.text = name;
      }
      const previousDonations = donations;
      donations = store.getState().user.donations;
      if (donationText != null && previousDonations !== donations) {
        donationText.text = `Donations: SGD ${this.#roundToTwo(donations)}`;
      }
    };

    store.subscribe(handleUserChange);
  }

  removeHouse() {
    house.destroy();
  }

  animateBuilding() {
    if (buildFrame === 0) {
      buildDirection = buildDirection === 3 ? 0 : buildDirection + 1;
      buildFrame = 100;
    }

    buildFrame -= 1;
    switch (buildDirection) {
      case 0:
        player.anims.play('build_right', true);
        break;
      case 1:
        player.anims.play('build_up', true);
        break;
      case 2:
        player.anims.play('build_left', true);
        break;
      case 3:
        player.anims.play('build_down', true);
        break;
      default:
        break;
    }
  }

  placeHouses() {
    const { houses } = store.getState();
    if (houses.total_house > 0 && getRemainingBuildTime(houses) > 0) {
      house = scene.add.image(
        HOUSE_STRUCT_IMAGE[0],
        HOUSE_STRUCT_IMAGE[1],
        'buildingstate',
      );
      house.scale = 1.2;
      house.depth = house.y + 110;
    }

    if (houses.total_house > 0 && getRemainingBuildTime(houses) <= 0) {
      if (houses.basic_hut === 1) {
        house = scene.add.image(680, 370, 'basichut');
        house.scale = 1.5;
        house.depth = house.y + 120;
      } else if (houses.brick_house === 1) {
        house = scene.add.image(550, 370, 'brickhouse');
        house.scale = 0.35;
        house.depth = house.y + 160;
      } else if (houses.concrete_house === 1) {
        house = scene.add.image(530, 370, 'concretehouse');
        house.scale = 0.9;
        house.depth = house.y + 180;
      }

      if (houses.building) {
        scene.scene.launch('ThankYouScene');
        scene.scene.pause('HabitatHeroesScene');
        this.rewardSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateBuildTime());
      }
    }
  }
}
/* eslint-enable class-methods-use-this */
