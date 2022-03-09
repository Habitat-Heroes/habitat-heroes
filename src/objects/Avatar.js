// GameObject avatar
import Phaser from 'phaser';

class Avatar extends Phaser.GameObjects.Sprite {
  player;

  constructor(scene, x, y, key, frame) {
    super(scene, x, y, key, frame);
    this.player = scene.physics.add.sprite(x, y, key);
    this.scene = scene;
    this.setPosition(x, y);
    this.setTexture(key);
    this.setFrame(frame);

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
      key: 'up',
      frames: this.anims.generateFrameNumbers('avatar', { start: 12, end: 16 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('avatar', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.player.setCollideWorldBounds(true);
  }
}

export default Avatar;
