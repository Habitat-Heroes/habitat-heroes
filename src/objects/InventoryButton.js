import Button from './Button';

export default function InventoryButton(scene, downSfx, overSfx) {
  // Create inventory button on bottom right (x, y) => (1300, 750)
  const inventoryButton = new Button(scene, 1300, 750, 'inventorybutton')
    .setDownTexture('inventorybutton')
    .setButtonName('Inventory')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
      scene.scene.launch('InventoryScene');
      scene.scene.pause('HabitatHeroesScene');
    });
  return inventoryButton;
}
