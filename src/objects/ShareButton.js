import Button from './Button';

export default function ShareButton(scene, downSfx, overSfx) {
  // Create news button on bottom right (x, y) => (1380, 750)
  const shareButton = new Button(scene, 1220, 750, 'sharebutton')
    .setDownTexture('sharebutton')
    .setButtonName('Share')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
      scene.scene.launch('SharePageScene');
      scene.scene.pause('HabitatHeroesScene');
    });
  return shareButton;
}
