import scenecache from '../assets/scenecache.json';

const data = scenecache;
const {tilewidth} = data;
const {tileheight} = data;
const mapwidth = data.layers[0].width * tilewidth;
const mapheight = data.layers[0].height * tileheight;

export default function checkInMovableRange(x, y) {
  if (x < 0 || y < 0 || y > mapheight || x > mapwidth) {
    return false;
  }

  // Check if it is in the range of the build button
  if (x > 0 && x < 90 && y > 710 && y < 800) {
    return false;
  }

  return true;
}
