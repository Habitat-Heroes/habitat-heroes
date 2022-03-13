import Button from './Button';

export default function NewsButton(scene, downSfx, overSfx) {
  // Create news button on bottom right (x, y) => (1380, 750)
  const newsButton = new Button(scene, 1380, 750, 'newsbutton')
    .setDownTexture('newsbutton')
    .setButtonName('News')
    .setDepth(800)
    .setScale(0.35)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
      scene.scene.launch('NewsBoardScene');
      scene.scene.pause('HabitatHeroesScene');
    });
  return newsButton;
}
