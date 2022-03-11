import Phaser from 'phaser';
import IsoPlugin from 'phaser3-plugin-isometric';

import avatar from '../assets/avatar1.png';
import house from '../assets/basic_hut.png';
import bbsprite from '../assets/game_menu/build_button.png';
import cbsprite from '../assets/game_menu/coins_button.png';
import ibsprite from '../assets/game_menu/inventory_button.png';
import nbsprite from '../assets/game_menu/news_button.png';
import qbsprite from '../assets/game_menu/quest_button.png';
import shbsprite from '../assets/game_menu/share_button.png';
import sbsprite from '../assets/game_menu/shop_button.png';
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
import { MAP_HEIGHT, MAP_LAYOUT, MAP_WIDTH, TILE_HEIGHT_HALF, TILE_WIDTH_HALF } from '../utils/constants';
import checkInMovableRange from '../utils/GameUtils';

let player;

let pointer;

let scene;
let touchX;
let touchY;

const centerX = MAP_WIDTH * TILE_WIDTH_HALF;
const centerY = MAP_HEIGHT * TILE_HEIGHT_HALF * 0.3;

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
    this.load.image('house', house);
    this.load.image('buildbutton', bbsprite);
    this.load.image('newsbutton', nbsprite);
    this.load.image('inventorybutton', ibsprite);
    this.load.image('questbutton', qbsprite);
    this.load.image('shopbutton', sbsprite);
    this.load.image('sharebutton', shbsprite);
    this.load.image('coinsbutton', cbsprite);
  }

  create() {
    scene = this;

    this.buildMap();
    this.placeHouses();

    player = new Avatar(scene, centerX - 100, centerY + 100, 'avatar', {
      key: 'avatar',
      frame: 0,
    }).player;
    player.depth = centerY + 164;
    touchY = centerY + 100;
    touchX = centerX - 100;
    pointer = scene.input.activePointer;

    // News Button
    this.newsButton = this.add.text(50, 50, 'News', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState())
      .on('pointerout', () => this.enterButtonRestState())
      .on('pointerdown', () => this.enterButtonActiveState())
      .on('pointerup', () => {
        this.enterButtonHoverState();
        this.scene.start('news');
      });
    this.newsButton.depth = this.newsButton.y + 186;

    scene.add.existing(BuildButton(this));
    scene.add.existing(InventoryButton(this));
    scene.add.existing(NewsButton(this));
    scene.add.existing(QuestButton(this));
    scene.add.existing(ShopButton(this));
    scene.add.existing(ShareButton(this));
    scene.add.existing(CoinsButton(this));
  }

  update() {
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
    }

    if (touchY > player.y) {
      player.anims.play('up', true);
      player.y += touchY > player.y + 2 ? 2 : touchY - player.y;
      player.depth = player.y + 48;
      return;
    }
    if (touchY < player.y) {
      player.anims.play('down', true);
      player.y -= touchY + 2 < player.y ? 2 : player.y - touchY;
      player.depth = player.y + 64;
      return;
    }

    if (touchX > player.x) {
      player.anims.play('right', true);
      player.x += touchX > player.x + 2 ? 2 : touchX - player.x;
    } else if (touchX < player.x) {
      player.anims.play('left', true);
      player.x -= touchX < player.x - 2 ? 2 : player.x - touchX;
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

  placeHouses() {
    const house1 = scene.add.image(680, 370, 'house');
    house1.scale = 1.5;
    house1.depth = house1.y + 86;
  }

  enterButtonHoverState() {
    this.newsButton.setStyle({ fill: '#ff0' });
  }

  enterButtonRestState() {
    this.newsButton.setStyle({ fill: '#0f0' });
  }

  enterButtonActiveState() {
    this.newsButton.setStyle({ fill: '#0ff' });
  }

}
/* eslint-enable class-methods-use-this */
