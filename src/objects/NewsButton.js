import Button from './Button';

export default function NewsButton(scene) {
  // Create news button on bottom right (x, y) => (1380, 750)
  const newsButton = new Button(scene, 1380, 750, 'newsbutton')
    .setDownTexture('newsbutton');
  newsButton.depth = 800;
  newsButton.scale = 0.35;
  newsButton.setButtonName('News');
  return newsButton;
}
