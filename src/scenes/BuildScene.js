import Phaser from 'phaser';

import buildmenu from '../assets/game_menu/woodboard_with_title.png';

let scene;

export class BuildScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'build'
    });
  }

  preload() {
    this.load.image('buildmenu', buildmenu);
  }

  create() {
    scene = this;
    this.showBuildMenu();
    // Build Button
    this.closeButton = this.add.text(925, 80, 'Close', { fill: '#0f0' })
      .setInteractive()
      .on('pointerover', () => this.enterButtonHoverState() )
      .on('pointerout', () => this.enterButtonRestState() )
      .on('pointerdown', () => this.enterButtonActiveState() )
      .on('pointerup', () => {
        this.enterButtonHoverState();
        this.scene.start('HabitatHeroesScene');
      });
  }

  showBuildMenu() {
    const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
    scene.add.image(screenCenterX, screenCenterY + 10, 'buildmenu').setScale(0.75);
  }

  enterButtonHoverState() {
    this.closeButton.setStyle({ fill: '#ff0'});
  }

  enterButtonRestState() {
    this.closeButton.setStyle({ fill: '#0f0' });
  }

  enterButtonActiveState() {
    this.closeButton.setStyle({ fill: '#0ff' });
  }
}
