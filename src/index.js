import Phaser from 'phaser';

import avatar from './assets/avatar1.png';
import mapjson from './assets/isometric-grass-and-water.json';
import tiles from './assets/isometric-grass-and-water.png';
import house from './assets/rem_0002.png';
import scenecache from './assets/scenecache.json';
import Avatar from './objects/Avatar';

let player;

let tileWidthHalf;
let tileHeightHalf;

let keyA;
let keyS;
let keyD;
let keyW;

let scene;

class HabitatHeroesScene extends Phaser.Scene {
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
    // this.cameras.main.setSize(1200, 800);

    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

    // this.cameras.main.scrollX = 800;
  }

  update() {
    if (keyA.isDown) {
      player.x -= 2;
      player.anims.play('left', true);
    } else if (keyS.isDown) {
      player.y += 2;
      player.anims.play('down', true);
      player.depth = player.y + 64;
    } else if (keyD.isDown) {
      player.x += 2;
      player.anims.play('right', true);
    } else if (keyW.isDown) {
      player.y -= 2;
      player.anims.play('up', true);
      player.depth = player.y + 48;
    } else {
      player.scene.time.delayedCall(
        0.15 * 1000,
        () => player.anims.play('still', true),
        [],
        this,
      );
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
}
/* eslint-enable class-methods-use-this */

const config = {
  type: Phaser.WEBGL,
  width: 1200,
  height: 600,
  backgroundColor: '#ababab',
  parent: 'phaser-example',
  scene: [HabitatHeroesScene],
  physics: {
    default: 'arcade',
    fps: 60,
    arcade: {
      gravity: { y: 0 },
    },
  },
};

/* eslint-disable no-unused-vars */
const game = new Phaser.Game(config);
/* eslint-enable no-unused-vars */
