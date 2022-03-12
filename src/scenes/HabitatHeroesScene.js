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
import trees from '../assets/tree_tiles.png';
import { Avatar } from '../objects/Avatar';
import BuildButton from '../objects/BuildButton';
import CoinsButton from '../objects/CoinsButton';
import InventoryButton from '../objects/InventoryButton';
import NewsButton from '../objects/NewsButton';
import QuestButton from '../objects/QuestButton';
import ShareButton from '../objects/ShareButton';
import ShopButton from '../objects/ShopButton';
import store from '../store';
import {
  AVATAR_PANEL_CENTER,
  BUILD_DIRECTION_MAPPING,
  MAP_HEIGHT,
  MAP_LAYOUT,
  MAP_WIDTH,
  TILE_HEIGHT_HALF,
  TILE_WIDTH_HALF,
} from '../utils/constants';
import checkInMovableRange from '../utils/GameUtils';

let player;
let house;
let buildFrame = 100;
let buildDirection = 0;

let pointer;

let scene;
let touchX;
let touchY;

let name;
let donations;
let nameText;
let donationText;

const centerX = MAP_WIDTH * TILE_WIDTH_HALF;
const centerY = MAP_HEIGHT * TILE_HEIGHT_HALF * 0.3;

const USE_ACTUAL_AVATAR_SPRITE = false;

export class HabitatHeroesScene extends Phaser.Scene {
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
  }

  create() {
    scene = this;

    this.buildMap();
    this.placeHouses();
    this.addAvatarPanel();

    player = new Avatar(scene, centerX - 100, centerY + 100, 'avatar', {
      key: 'avatar',
      frame: 0,
    }).player;
    player.depth = centerY + 164;
    touchY = centerY + 100;
    touchX = centerX - 100;
    pointer = scene.input.activePointer;

    scene.add.existing(BuildButton(this));
    scene.add.existing(InventoryButton(this));
    scene.add.existing(NewsButton(this));
    scene.add.existing(QuestButton(this));
    scene.add.existing(ShopButton(this));
    scene.add.existing(ShareButton(this));
    scene.add.existing(CoinsButton(this));
  }

  update() {
    if (store.getState().houses.building) {
      if (
        player.x === BUILD_DIRECTION_MAPPING[buildDirection][0] &&
        player.y === BUILD_DIRECTION_MAPPING[buildDirection][1]
      ) {
        this.animateBuilding();
      } else {
        this.walkToPoint(
          BUILD_DIRECTION_MAPPING[buildDirection][0],
          BUILD_DIRECTION_MAPPING[buildDirection][1],
        );
      }
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

  // eslint-disable-next-line class-methods-use-this
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

  /* eslint-disable class-methods-use-this */
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
    if (houses.total_house > 0 && houses.building) {
      house = scene.add.image(650, 370, 'buildingstate');
      house.scale = 1.2;
      house.depth = house.y + 110;
    }

    if (houses.total_house > 0 && !houses.building) {
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
    }
  }
}
/* eslint-enable class-methods-use-this */
