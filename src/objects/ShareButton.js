import Button from './Button';

export default function ShareButton(scene) {
  // Create news button on bottom right (x, y) => (1380, 750)
  const shareButton = new Button(
    scene,
    1220,
    750,
    'sharebutton',
  ).setDownTexture('sharebutton');
  shareButton.depth = 800;
  shareButton.scale = 0.35;
  shareButton.setButtonName('Share');
  shareButton.setOnDownCallback(() => {
    scene.scene.start('sharepage');
  });
  return shareButton;
}
