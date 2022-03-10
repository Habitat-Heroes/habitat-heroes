import Phaser from 'phaser';

const ORANGE = 0xFFAD00;
const LIGHTORANGE = 0xffcd60;

export default class Button extends Phaser.GameObjects.Image {
  upTexture;

  upTint;

  downTexture;

  downTint;

  overTexture;

  overTint;

  disabledTexture;

  disabledTint;

  constructor(scene, x, y, texture, tint = ORANGE) {
    super(scene, x, y, texture);

    this.setTint(tint);

    this.upTexture = texture;
    this.upTint = tint;
    this.downTexture = texture;
    this.downTint = tint;
    this.overTexture = texture;
    this.overTint = LIGHTORANGE;
    this.disabledTexture = texture;
    this.disabledTint = tint;

    this.setInteractive({ cursor: 'pointer' })
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, this.handleUp, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT, this.handleOut, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.handleDown, this)
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER, this.handleOver, this);
  }

  setUpTexture(texture) {
    this.upTexture = texture;
    return this;
  }

  setUpTint(tint) {
    this.upTint = tint;
    return this;
  }

  setDownTexture(texture) {
    this.downTexture = texture;
    return this;
  }

  setDownTint(tint) {
    this.downTint = tint;
    return this;
  }

  setOverTexture(texture) {
    this.overTexture = texture;
    return this;
  }

  setOverTint(tint) {
    this.overTint = tint;
    return this;
  }

  setDisabledTexture(texture) {
    this.disabledTexture = texture;
    return this;
  }

  setDisabledTint(tint) {
    this.disabledTint = tint;
    return this;
  }

  setDisabled(disabled) {
    if (disabled)
    {
      this.setTexture(this.disabledTexture);
      this.setTint(this.disabledTint);
      this.disableInteractive();
      return this;
    }

    this.setTexture(this.upTexture);
    this.setTint(this.disabledTint);
    this.setInteractive();

    return this;
  }

  handleUp(pointer) {
    this.handleOver(pointer);
  }

  handleOut() {
    this.setTexture(this.upTexture);
    this.setTint(this.upTint);
  }

  handleDown() {
    this.setTexture(this.downTexture);
    this.setTint(this.downTint);
  }

  handleOver() {
    this.setTexture(this.overTexture);
    this.setTint(this.overTint);
  }
}
