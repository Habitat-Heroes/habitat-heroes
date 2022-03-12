import Button from './Button';

export default function QuestButton(scene) {
  // Create quest button on bottom right (x, y) => (1460, 750)
  const questButton = new Button(
    scene,
    1460,
    750,
    'questbutton',
  ).setDownTexture('questbutton');
  questButton.depth = 800;
  questButton.scale = 0.35;
  questButton.setButtonName('Quest');
  return questButton;
}
