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
import green from '../assets/green.png';
import buildingstate from '../assets/house_struct.png';
import mapjson from '../assets/isometric-grass-and-water.json';
import tiles from '../assets/isometric-grass-and-water.png';
import zerobar from '../assets/loading_bar/0bar.png';
import onebar from '../assets/loading_bar/1bar.png';
import twobar from '../assets/loading_bar/2bar.png';
import threebar from '../assets/loading_bar/3bar.png';
import fourbar from '../assets/loading_bar/4bar.png';
import fivebar from '../assets/loading_bar/5bar.png';
import pink from '../assets/pink.png';
import trees from '../assets/tree_tiles.png';
import adssprite from '../assets/video/plus_button.png';
import villager1 from '../assets/villager1.png';
import villager2 from '../assets/villager2.png';
import villager3 from '../assets/villager3.png';
import AdsButton from '../objects/AdsButton';
import { Avatar } from '../objects/Avatar';
import BuildButton from '../objects/BuildButton';
import Button from '../objects/Button';
import CoinsButton from '../objects/CoinsButton';
import InventoryButton from '../objects/InventoryButton';
import NewsButton from '../objects/NewsButton';
import QuestButton from '../objects/QuestButton';
import ShareButton from '../objects/ShareButton';
import ShopButton from '../objects/ShopButton';
import Villager from '../objects/Villager';
import { updateBuildTime } from '../reducers/houseReducer';
import { removeFromInventory } from '../reducers/inventoryReducer';
import { addToMap } from '../reducers/mapItemsReducer';
import building from '../sounds/building.mp3';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import footstep from '../sounds/footstep.mp3';
import mainbgm from '../sounds/mainbgm.mp3';
import openmenu from '../sounds/openmenu.mp3';
import reward from '../sounds/reward.mp3';
import thud from '../sounds/thud.mp3';
import store from '../store';
import {
  AVATAR_PANEL_CENTER,
  BUILD_DIRECTION_MAPPING,
  DEFAULT_SFX_CONFIG,
  HOUSE_STRUCT_IMAGE,
  MAP_HEIGHT,
  MAP_LAYOUT,
  MAP_WIDTH,
  TILE_HEIGHT,
  TILE_HEIGHT_HALF,
  TILE_WIDTH,
  TILE_WIDTH_HALF,
} from '../utils/constants';
import { isCoordinateFree } from '../utils/coordinates';
import {
  convertSecondsToText,
  getRemainingBuildTime,
} from '../utils/GameUtils';
import { loadItemSprites } from '../utils/items';
import {
  addHighlightSquares,
  getCursorCoord,
  getHighlightSquareCoords,
  getIsBuilding,
  setCells,
  setIsBuilding,
} from '../utils/placementUtils';

let player;
let villager;
let villagerIdx = 1;
let house;
let buildFrame = 100;
let buildDirection = 0;
let timerText;
let buildTimerBarImage;
let currentBuildTimerBar;

const playerXOffset = 0;
const playerYOffset = -20;

let pointer;

let scene;
let touchX;
let touchY;

let name;
let donations;
let nameText;
let donationText;

let bgm;
let openMenuSfx;
let overSfx;

let isMoving = false;
let hasTriedToMoveToBuild = false;

const centerX = MAP_WIDTH * TILE_WIDTH_HALF;
const centerY = MAP_HEIGHT * TILE_HEIGHT_HALF * 0.3;

const USE_ACTUAL_AVATAR_SPRITE = false;

let yMagnitudeRemaining = 0;
let xMagnitudeRemaining = 0;
let isXNegative = false;
let isYNegative = false;

export class HabitatHeroesScene extends Phaser.Scene {
  buildingSfx;

  rewardSfx;

  thudSfx;

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
    this.load.image('adsbutton', adssprite);
    this.load.image('inventorybutton', ibsprite);
    this.load.image('questbutton', qbsprite);
    this.load.image('shopbutton', sbsprite);
    this.load.image('sharebutton', shbsprite);
    this.load.image('coinsbutton', cbsprite);
    this.load.image('villager1', villager1);
    this.load.image('villager2', villager2);
    this.load.image('villager3', villager3);
    this.load.image(
      'avatarpanel',
      USE_ACTUAL_AVATAR_SPRITE ? avatarpanelwithoutlucas : avatarpanel,
    );
    this.load.image('green', green);
    this.load.image('pink', pink);
    this.load.audio('mainbgm', mainbgm);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.audio('footstep', footstep);
    this.load.audio('building', building);
    this.load.audio('reward', reward);
    this.load.audio('openmenu', openmenu);
    this.load.audio('thud', thud);
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
    overSfx = this.sound.add('buttonhover');
    openMenuSfx = this.sound.add('openmenu');
    const footstepSfx = this.sound.add('footstep');
    this.thudSfx = this.sound.add('thud');
    this.buildingSfx = this.sound.add('building');
    this.rewardSfx = this.sound.add('reward');

    this.buildMap();
    this.placeHouses();
    this.addAvatarPanel();

    player = new Avatar(
      scene,
      704 + playerXOffset,
      232 + playerYOffset,
      'avatar',
      {
        key: 'avatar',
        frame: 0,
      },
      footstepSfx,
    ).player;
    player.depth = 232 + 110;
    touchX = 704 + playerXOffset;
    touchY = 232 + playerYOffset;
    pointer = scene.input.activePointer;

    scene.add.existing(BuildButton(this, openMenuSfx, overSfx));
    scene.add.existing(InventoryButton(this, openMenuSfx, overSfx));
    scene.add.existing(NewsButton(this, openMenuSfx, overSfx));
    scene.add.existing(AdsButton(this, openMenuSfx, overSfx));
    scene.add.existing(QuestButton(this, openMenuSfx, overSfx));
    scene.add.existing(ShopButton(this, openMenuSfx, overSfx));
    scene.add.existing(ShareButton(this, openMenuSfx, overSfx));
    scene.add.existing(CoinsButton(this, downSfx, overSfx));

    store.getState().mapItems.items.forEach((item) => {
      this.add
        .image(item.displayX, item.displayY, item.spritesheet, item.frame)
        .setDepth(item.depth);
    });

    this.events.on('resume', (_scene, data) => {
      if (data == null) {
        return;
      }

      const { spritesheet, frame, itemId, offsetX, offsetY, cells } = data;
      setCells(cells);
      const placingItemImage = this.add.image(
        this.input.x + this.cameras.main.scrollX,
        this.input.y + this.cameras.main.scrollY,
        spritesheet,
        frame,
      );
      placingItemImage.depth = 850;
      placingItemImage.setAlpha(0.6);
      setIsBuilding(true);
      const placingItemFn = () => {
        const coords = getHighlightSquareCoords();
        if (coords.length === 0) {
          return;
        }
        placingItemImage.setPosition(
          coords[0][0] + offsetX,
          coords[0][1] + offsetY,
        );
      };
      this.input.on('pointermove', placingItemFn);

      // eslint-disable-next-line no-shadow
      const placeItemFn = (pointer) => {
        if (pointer.rightButtonDown()) {
          this.input.off('pointermove', placingItemFn);
          this.input.off('pointerdown', placeItemFn);
          if (placingItemImage) {
            placingItemImage.destroy();
          }
          setIsBuilding(false);
          return;
        }
        const coords = getHighlightSquareCoords();
        if (coords.some((c) => !isCoordinateFree(c[0], c[1]))) {
          this.thudSfx.play({ ...DEFAULT_SFX_CONFIG, volume: 1.5 });
          return;
        }
        const [x, y] = coords[0];
        let depth = y + 110;
        if (spritesheet === 'pavements') {
          depth -= 90;
        }

        placingItemImage.setAlpha(1).setDepth(depth);
        this.input.off('pointermove', placingItemFn);
        this.input.off('pointerdown', placeItemFn);
        store.dispatch(
          addToMap({
            displayX: x + offsetX,
            displayY: y + offsetY,
            depth,
            spritesheet,
            frame,
            cellsOccupied: coords,
          }),
        );
        store.dispatch(removeFromInventory({ [itemId]: 1 }));
        this.thudSfx.play(DEFAULT_SFX_CONFIG);
        setIsBuilding(false);
      };

      this.input.on('pointerdown', placeItemFn);
    });
  }

  update() {
    if (
      getRemainingBuildTime(store.getState().houses) > 0 ||
      store.getState().houses.building
    ) {
      this.updateBuilding();
      return;
    }

    if (pointer.isDown) {
      const [x, y] = getCursorCoord();
      touchX = x + playerXOffset;
      touchY = y + playerYOffset;
      isMoving = true;
    }

    if (!isMoving) {
      player.scene.time.delayedCall(
        0.15 * 1000,
        () => {
          player.anims.play('still', true);
        },
        [],
        this,
      );
    } else if (!getIsBuilding()) {
      this.walkToPoint(touchX, touchY);
    }
  }

  /* eslint-disable class-methods-use-this */
  destroyTimer() {
    if (timerText != null) {
      timerText.destroy();
      timerText = null;
    }
    if (buildTimerBarImage != null) {
      buildTimerBarImage.destroy();
      buildTimerBarImage = null;
    }
  }

  updateBuilding() {
    if (
      player.x === BUILD_DIRECTION_MAPPING[buildDirection][0] + playerXOffset &&
      player.y === BUILD_DIRECTION_MAPPING[buildDirection][1] + playerYOffset
    ) {
      if (!this.buildingSfx.isPlaying) {
        this.buildingSfx.play({ ...DEFAULT_SFX_CONFIG, loop: true });
      }
      this.animateBuilding();
    } else if (hasTriedToMoveToBuild && !isMoving) {
      buildDirection = buildDirection === 3 ? 0 : buildDirection + 1;
      hasTriedToMoveToBuild = false;
    } else {
      isMoving = true;
      hasTriedToMoveToBuild = true;
      this.walkToPoint(
        BUILD_DIRECTION_MAPPING[buildDirection][0] + playerXOffset,
        BUILD_DIRECTION_MAPPING[buildDirection][1] + playerYOffset,
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
          scene.scene.launch('ThankYouScene', { villager: villagerIdx });
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
      if (buildTimerBarImage != null) {
        buildTimerBarImage.destroy();
      }
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
    if (!isMoving) {
      return;
    }
    if (yMagnitudeRemaining > 0) {
      let amount = isYNegative ? -2 : 2;
      if (yMagnitudeRemaining <= Math.abs(amount)) {
        amount = isYNegative ? -yMagnitudeRemaining : yMagnitudeRemaining;
        yMagnitudeRemaining = 0;
      } else {
        yMagnitudeRemaining -= 2;
      }
      player.anims.play(isYNegative ? 'down' : 'up', true);
      player.y += amount;
      player.depth = player.y + 110;
      return;
    }
    if (xMagnitudeRemaining > 0) {
      let amount = isXNegative ? -2 : 2;
      if (xMagnitudeRemaining <= Math.abs(amount)) {
        amount = isXNegative ? -xMagnitudeRemaining : xMagnitudeRemaining;
        xMagnitudeRemaining = 0;
      } else {
        xMagnitudeRemaining -= 2;
      }
      player.anims.play(isXNegative ? 'left' : 'right', true);
      player.x += amount;
      return;
    }
    if (
      y >= player.y + TILE_HEIGHT &&
      isCoordinateFree(
        player.x - playerXOffset,
        player.y + TILE_HEIGHT - playerYOffset,
        true,
      )
    ) {
      player.anims.play('up', true);
      player.y += 2;
      yMagnitudeRemaining = TILE_HEIGHT - 2;
      isYNegative = false;
      player.depth = player.y + 110;
      return;
    }
    if (
      y <= player.y - TILE_HEIGHT &&
      isCoordinateFree(
        player.x - playerXOffset,
        player.y - TILE_HEIGHT - playerYOffset,
        true,
      )
    ) {
      player.anims.play('down', true);
      player.y -= 2;
      yMagnitudeRemaining = TILE_HEIGHT - 2;
      isYNegative = true;
      player.depth = player.y + 110;
      return;
    }
    if (
      x >= player.x + TILE_WIDTH &&
      isCoordinateFree(
        player.x + TILE_WIDTH - playerXOffset,
        player.y - playerYOffset,
        true,
      )
    ) {
      player.anims.play('right', true);
      player.x += 2;
      xMagnitudeRemaining = TILE_WIDTH - 2;
      isXNegative = false;
      return;
    }
    if (
      x <= player.x - TILE_WIDTH &&
      isCoordinateFree(
        player.x - TILE_WIDTH - playerXOffset,
        player.y - playerYOffset,
        true,
      )
    ) {
      player.anims.play('left', true);
      player.x -= 2;
      xMagnitudeRemaining = TILE_WIDTH - 2;
      isXNegative = true;
      return;
    }
    // If we can reach here, it must be one of the three possible cases:
    // - We got stuck
    // - We're half-step away either vertically, horizontally or both
    // - We've reached the destination

    // Case 3: reached
    if (y === player.y && x === player.x) {
      isMoving = false;
      return;
    }

    // Case 2: half-step away
    if (
      Math.abs(player.y - y) === TILE_HEIGHT_HALF &&
      Math.abs(player.x - x) === TILE_WIDTH_HALF
    ) {
      if (isCoordinateFree(x - playerXOffset, y - playerYOffset, true)) {
        if (x === player.x) {
          if (y > player.y) {
            player.anims.play('up', true);
            player.y += 2;
            yMagnitudeRemaining = TILE_HEIGHT_HALF - 2;
            isYNegative = false;
          } else {
            player.anims.play('down', true);
            player.y -= 2;
            yMagnitudeRemaining = TILE_HEIGHT_HALF - 2;
            isYNegative = true;
          }
        } else if (x > player.x) {
          player.anims.play('right', true);
          player.x += 2;
          xMagnitudeRemaining = TILE_WIDTH_HALF - 2;
          isXNegative = false;
          if (y !== player.y) {
            yMagnitudeRemaining = TILE_HEIGHT_HALF;
            isYNegative = y < player.y;
          }
        } else {
          player.anims.play('left', true);
          player.x -= 2;
          xMagnitudeRemaining = TILE_WIDTH_HALF - 2;
          isXNegative = true;
          if (y !== player.y) {
            yMagnitudeRemaining = TILE_HEIGHT_HALF;
            isYNegative = y < player.y;
          }
        }
      }
    }

    // Case 1: stuck
    this.thudSfx.play(DEFAULT_SFX_CONFIG);
    isMoving = false;
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
          const tile = scene.add
            .image(centerX + tx, centerY + ty, 'tiles', id)
            .setInteractive();
          tile.depth = centerY + ty;
          // eslint-disable-next-line no-shadow, no-loop-func
          tile.on('pointerover', (pointer) => {
            const topLeft = [
              tile.x - TILE_WIDTH_HALF,
              tile.y - TILE_HEIGHT_HALF,
            ];
            const topRight = [
              tile.x + TILE_WIDTH_HALF,
              tile.y - TILE_HEIGHT_HALF,
            ];
            const top = [tile.x, tile.y - TILE_HEIGHT];
            const currentTile = [tile.x, tile.y];
            const possibleTiles = [topLeft, topRight, top, currentTile];
            let minDist = Infinity;
            let index = 0;
            for (let k = 0; k < 4; k += 1) {
              const cSquared =
                (pointer.x - possibleTiles[k][0]) ** 2 +
                (pointer.y - possibleTiles[k][1]) ** 2;
              if (cSquared < minDist) {
                minDist = cSquared;
                index = k;
              }
            }
            addHighlightSquares(
              possibleTiles[index][0],
              possibleTiles[index][1],
              scene,
            );
          });
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
    if (villager != null) {
      villager.destroy();
      villager = null;
    }
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
      house = new Button(
        scene,
        HOUSE_STRUCT_IMAGE[0],
        HOUSE_STRUCT_IMAGE[1],
        'buildingstate',
      )
        .setDownTexture('buildingstate')
        .setButtonName('Speed up building!')
        .setScale(1.2)
        .setDepth(HOUSE_STRUCT_IMAGE[1] + 110)
        .setUpTint(0xffffff)
        .setOverTint(0xffffff)
        .setTint(0xffffff)
        .setDisabledTint(0xffffff)
        .setDisabled(true);
      house.on('pointerup', () => {
        scene.scene.launch('QuizScene');
        scene.scene.pause('HabitatHeroesScene');
      });
      scene.add.existing(house);
    }

    if (houses.total_house > 0 && getRemainingBuildTime(houses) <= 0) {
      if (houses.basic_hut === 1) {
        house = scene.add.image(680, 370, 'basichut');
        house.scale = 1.5;
        house.depth = house.y + 120;
        villager = new Villager(this, 1, openMenuSfx, overSfx);
        villagerIdx = 1;
      } else if (houses.brick_house === 1) {
        house = scene.add.image(550, 370, 'brickhouse');
        house.scale = 0.35;
        house.depth = house.y + 160;
        villager = new Villager(this, 2, openMenuSfx, overSfx);
        villagerIdx = 2;
      } else if (houses.concrete_house === 1) {
        house = scene.add.image(530, 370, 'concretehouse');
        house.scale = 0.9;
        house.depth = house.y + 180;
        villager = new Villager(this, 3, openMenuSfx, overSfx);
        villagerIdx = 3;
      }
      scene.add.existing(villager);

      if (houses.building) {
        scene.scene.launch('ThankYouScene', { villager: villagerIdx });
        scene.scene.pause('HabitatHeroesScene');
        this.rewardSfx.play(DEFAULT_SFX_CONFIG);
        store.dispatch(updateBuildTime());
      }
    }
  }
}
/* eslint-enable class-methods-use-this */
