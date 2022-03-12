import Button from './Button';

export default function BuildButton(scene, downSfx, overSfx) {
  // Create build button on bottom left (x, y) => (50, 750)
  const buildButton = new Button(scene, 50, 750, 'buildbutton')
    .setDownTexture('buildbutton')
    .setButtonName('Build')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
      scene.scene.launch('BuildMenuScene');
      scene.scene.pause('HabitatHeroesScene');
    });
  return buildButton;
}
