// GameObject avatar
import Phaser from 'phaser';

import { DEFAULT_SFX_CONFIG } from '../utils/constants';

export class Avatar extends Phaser.GameObjects.Sprite {
  player;

  constructor(scene, x, y, key, frame, footstepSfx) {
    super(scene, x, y, key, frame);
    this.player = scene.physics.add.sprite(x, y, key);
    this.scene = scene;
    this.setPosition(x, y);
    this.setTexture(key);
    this.setFrame(frame);
    this.player.on('animationrepeat', (animation) => {
      const { key: repeatKey } = animation;
      if (
        repeatKey === 'left' ||
        repeatKey === 'right' ||
        repeatKey === 'up' ||
        repeatKey === 'down'
      ) {
        footstepSfx.play({ ...DEFAULT_SFX_CONFIG });
      }
    });

    scene.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('avatar', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'still',
      frames: [{ key: 'avatar', frame: 0 }],
      frameRate: 20,
    });

    scene.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('avatar', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('avatar', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('avatar', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'build_left',
      frames: this.anims.generateFrameNumbers('avatar', { start: 20, end: 23 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'build_right',
      frames: this.anims.generateFrameNumbers('avatar', { start: 24, end: 27 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'build_up',
      frames: this.anims.generateFrameNumbers('avatar', { start: 16, end: 19 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'build_down',
      frames: this.anims.generateFrameNumbers('avatar', { start: 28, end: 31 }),
      frameRate: 10,
      repeat: -1,
    });

    this.player.setCollideWorldBounds(true);
  }
}
