import Button from './Button';

export default function InventoryButton(scene) {
  // Create inventory button on bottom right (x, y) => (1300, 750)
  const inventoryButton = new Button(scene, 1300, 750, 'inventorybutton')
    .setDownTexture('inventorybutton');
  inventoryButton.depth = 800;
  inventoryButton.scale = 0.35;
  inventoryButton.setButtonName('Inventory');
  return inventoryButton;
}
