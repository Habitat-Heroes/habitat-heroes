import Button from './Button';

export default function ShopButton(scene) {
  // Create shop button on bottom right (x, y) => (1540, 750)
  const shopButton = new Button(scene, 1540, 750, 'shopbutton').setDownTexture(
    'shopbutton',
  );
  shopButton.depth = 800;
  shopButton.scale = 0.35;
  shopButton.setButtonName('Shop');
  shopButton.setOnDownCallback(() => {
    scene.scene.launch('ShopScene');
    scene.scene.pause('HabitatHeroesScene');
  });
  return shopButton;
}
