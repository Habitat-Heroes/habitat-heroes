import Button from './Button';

export default function BuildButton(scene) {
  // Create build button on bottom left (x, y) => (50, 750)
  const buildButton = new Button(scene, 50, 750, 'buildbutton')
    .setDownTexture('buildbutton');
  buildButton.depth = 800;
  buildButton.scale = 0.35;
  buildButton.setButtonName('Build');
  return buildButton;
}
