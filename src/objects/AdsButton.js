import Button from './Button';

export default function AdsButton(scene, downSfx, overSfx) {
  // Create news button on bottom right (x, y) => (1380, 750)
  const adsButton = new Button(scene, 1140, 750, 'adsbutton')
    .setDownTexture('adsbutton')
    .setButtonName('Earn More Coins!')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
      scene.scene.launch('AdsScene');
      scene.scene.pause('HabitatHeroesScene');
    });
  return adsButton;
}
