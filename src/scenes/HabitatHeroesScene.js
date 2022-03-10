import Phaser from 'phaser';

import avatar from '../assets/avatar1.png';
import house from '../assets/basic_hut.png';
import mapjson from '../assets/isometric-grass-and-water.json';
import tiles from '../assets/isometric-grass-and-water.png';
import scenecache from '../assets/scenecache.json';
import Avatar from '../objects/Avatar';

let player;

let tileWidthHalf;
let tileHeightHalf;

let pointer;

let scene;
let touchX;
let touchY;

class HabitatHeroesScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'HabitatHeroesScene',
      mapAdd: {isoPlugin: 'iso', isoPhysics: 'isoPhysics'}
    });
  }

  preload() {
    this.load.json('map', mapjson);
    this.load.spritesheet('tiles', tiles, { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('avatar', avatar, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image('house', house);
  }

  create() {
    scene = this;

    this.buildMap();
    this.placeHouses();

    player = new Avatar(scene, 128, 128, 'avatar', { key: 'avatar', frame: 0 }).player;
    touchY = 128;
    touchX = 128;
    pointer = scene.input.activePointer;
    // this.cameras.main.setSize(1200, 800);
    // this.cameras.main.scrollX = 800;

    // News Button
    this.newsButton = this.add.text(50, 50, 'News', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        //this.updateClickCountText(++clickCount);
        this.enterButtonHoverState();
        this.scene.start("news");
    });

  }

  update() {
    if (pointer.isDown) {
      if (pointer.x > 100) { // disable character from entering the left panel
        touchX = pointer.x;
        touchY = pointer.y;
      }
    }

    if (touchY === player.y && touchX === player.x) {
      player.scene.time.delayedCall(
        0.15 * 1000,
        () => {
          player.anims.play('still', true);
        },
        [],
        this);
    }

    if (touchY > player.y) {
      player.anims.play('up', true);
      player.y += touchY > player.y + 2 ? 2 : touchY - player.y;
      player.depth = player.y + 48;
      return;
    } if (touchY < player.y) {
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
    //  Parse the data out of the map in scene cache
    const data = scenecache;

    const { tilewidth } = data;
    const { tileheight } = data;

    tileWidthHalf = tilewidth / 2;
    tileHeightHalf = tileheight / 2;

    const layer = data.layers[0].data;

    const mapwidth = data.layers[0].width;
    const mapheight = data.layers[0].height;

    const centerX = mapwidth * tileWidthHalf;
    const centerY = 16;

    let i = 0;

    for (let y = 0; y < mapheight; y += 1) {
      for (let x = 0; x < mapwidth; x += 1) {
        const id = layer[i] - 1;

        const tx = (x - y) * tileWidthHalf;
        const ty = (x + y) * tileHeightHalf;

        const tile = scene.add.image(centerX + tx, centerY + ty, 'tiles', id);

        tile.depth = centerY + ty;

        i += 1;
      }
    }
  }

  placeHouses() {
    const house1 = scene.add.image(440, 370, 'house');
    house1.depth = house1.y + 86;
  }

  enterButtonHoverState() {
    this.newsButton.setStyle({ fill: '#ff0'});
  }
  enterButtonRestState() {
    this.newsButton.setStyle({ fill: '#0f0' });
  }
  enterButtonActiveState() {
    this.newsButton.setStyle({ fill: '#0ff' });
  }
}
/* eslint-enable class-methods-use-this */

export default HabitatHeroesScene;
