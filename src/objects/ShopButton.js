import Button from './Button';

export default function ShopButton(scene, downSfx, overSfx) {
  // Create shop button on bottom right (x, y) => (1540, 750)
  const shopButton = new Button(scene, 1540, 750, 'shopbutton')
    .setDownTexture('shopbutton')
    .setButtonName('Shop')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
      scene.scene.launch('ShopScene');
      scene.scene.pause('HabitatHeroesScene');
    });
  return shopButton;
}
