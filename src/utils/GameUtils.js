import scenecache from '../assets/scenecache.json';

const data = scenecache;
const {tilewidth} = data;
const {tileheight} = data;
const mapwidth = data.layers[0].width * tilewidth;
const mapheight = data.layers[0].height * tileheight;

export default function checkInMovableRange(x, y) {
  if (x < 50 || y < 50 || y > mapheight - 50 || x > mapwidth - 50) {
    return false;
  }

  // Check if it is in the range of the buttons on the right
  if (x > 1220 && y > 700) {
    return false;
  }

  // Check if it is in the range of the build button
  if (x > 0 && x < 90 && y > 710 && y < 800) {
    return false;
  }

  return true;
}
