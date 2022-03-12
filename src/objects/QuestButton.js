import Button from './Button';

export default function QuestButton(scene, downSfx, overSfx) {
  // Create quest button on bottom right (x, y) => (1460, 750)
  const questButton = new Button(scene, 1460, 750, 'questbutton')
    .setDownTexture('questbutton')
    .setButtonName('Quest')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx);
  return questButton;
}
