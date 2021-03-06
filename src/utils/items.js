import christmastree from '../assets/shop/christmas_tree.png';
import pavements from '../assets/shop/expensive_tiles.png';
import goldpartners from '../assets/shop/gold_partners.png';
import hfhflag from '../assets/shop/HFHflag.png';
import merlion from '../assets/shop/merlion.png';
import silverpartners from '../assets/shop/silver_partners.png';
import torch from '../assets/shop/torch.png';
import wishingwell from '../assets/shop/wishingwell.png';
import trees from '../assets/tree_tiles.png';

export function loadItemSprites(scene) {
  // call this function in any scene that will render item images
  scene.load.spritesheet('trees', trees, {
    frameWidth: 120,
    frameHeight: 171,
  });
  scene.load.spritesheet('pavements', pavements, {
    frameWidth: 64,
    frameHeight: 64,
  });
  scene.load.spritesheet('hfhflag', hfhflag, {
    frameWidth: 138,
    frameHeight: 230,
  });
  scene.load.spritesheet('goldpartners', goldpartners, {
    frameWidth: 138,
    frameHeight: 251,
  });
  scene.load.spritesheet('silverpartners', silverpartners, {
    frameWidth: 138,
    frameHeight: 251,
  });
  scene.load.spritesheet('christmastree', christmastree, {
    frameWidth: 164,
    frameHeight: 187,
  });
  scene.load.spritesheet('merlion', merlion, {
    frameWidth: 103,
    frameHeight: 216,
  });
  scene.load.spritesheet('torch', torch, {
    frameWidth: 41,
    frameHeight: 82,
  });
  scene.load.spritesheet('wishingwell', wishingwell, {
    frameWidth: 209,
    frameHeight: 303,
  });
}

// itemID is array index

const ITEMS = [
  {
    name: 'HFH Flag',
    spritesheet: 'hfhflag',
    frame: 0,
    cost: 100,
    offsetX: 14,
    offsetY: -60,
    cells: [[0, 0]],
  },
  {
    name: 'Corporate Partners (Gold)',
    spritesheet: 'goldpartners',
    frame: 0,
    cost: 100,
    offsetX: -5,
    offsetY: -32,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, 0.5],
    ],
  },
  {
    name: 'Corporate Partners (Silver)',
    spritesheet: 'silverpartners',
    frame: 0,
    cost: 100,
    offsetX: -5,
    offsetY: -32,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, 0.5],
    ],
  },
  {
    name: 'Christmas Tree',
    spritesheet: 'christmastree',
    frame: 0,
    cost: 800,
    offsetX: -5,
    offsetY: -32,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, 0.5],
      [-1, 0],
      [-0.5, -0.5],
      [0, -1],
      [0, 1],
      [0.5, 0.5],
      [1, 0],
    ],
  },
  {
    name: 'Merlion',
    spritesheet: 'merlion',
    frame: 0,
    cost: 6000,
    offsetX: 0,
    offsetY: -99,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, -0.5],
      [0, -1],
    ],
  },
  {
    name: 'Torch',
    spritesheet: 'torch',
    frame: 0,
    cost: 120,
    offsetX: 0,
    offsetY: -36,
    cells: [[0, 0]],
  },
  {
    name: 'Wishing Well',
    spritesheet: 'wishingwell',
    frame: 0,
    cost: 14000,
    offsetX: 30,
    offsetY: -110,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, 0.5],
      [-1, 0],
      [-0.5, -0.5],
      [0, -1],
      [0, 1],
      [0.5, 0.5],
      [1, 0],
    ],
  },
  {
    name: 'Spooky Trunk',
    spritesheet: 'trees',
    frame: 0,
    cost: 20,
    offsetX: 20,
    offsetY: -50,
    cells: [[0, 0]],
  },
  {
    name: 'Exquisite Tree',
    spritesheet: 'trees',
    frame: 1,
    cost: 300,
    offsetX: 12,
    offsetY: -65,
    cells: [[0, 0]],
  },
  {
    name: 'Lush Log',
    spritesheet: 'trees',
    frame: 2,
    cost: 25,
    offsetX: 0,
    offsetY: -40,
    cells: [
      [0, 0],
      [-0.5, -0.5],
      [0.5, 0.5],
    ],
  },
  {
    name: 'Round Tree',
    spritesheet: 'trees',
    frame: 3,
    cost: 90,
    offsetX: 0,
    offsetY: -65,
    cells: [[0, 0]],
  },
  {
    name: 'Pine Tree',
    spritesheet: 'trees',
    frame: 4,
    cost: 35,
    offsetX: 0,
    offsetY: -60,
    cells: [[0, 0]],
  },
  {
    name: 'Green Tree',
    spritesheet: 'trees',
    frame: 5,
    cost: 88,
    offsetX: -2,
    offsetY: -65,
    cells: [[0, 0]],
  },
  {
    name: 'Stump',
    spritesheet: 'trees',
    frame: 6,
    cost: 60,
    offsetX: 0,
    offsetY: -70,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, -0.5],
      [0, -1],
    ],
  },
  {
    name: 'Polished Rock',
    spritesheet: 'trees',
    frame: 7,
    cost: 2000,
    offsetX: 0,
    offsetY: -50,
    cells: [
      [0, 0],
      [0.5, -0.5],
      [-0.5, -0.5],
      [0, -1],
    ],
  },
  {
    name: 'Gravel Tile 1',
    spritesheet: 'pavements',
    frame: 0,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Gravel Tile 2',
    spritesheet: 'pavements',
    frame: 1,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Gravel Tile 3',
    spritesheet: 'pavements',
    frame: 2,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Gravel Tile 4',
    spritesheet: 'pavements',
    frame: 3,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Red Sand Tile',
    spritesheet: 'pavements',
    frame: 4,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Sand Tile',
    spritesheet: 'pavements',
    frame: 5,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Stone Tile',
    spritesheet: 'pavements',
    frame: 6,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Wood Tile',
    spritesheet: 'pavements',
    frame: 7,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Pebble Tile 1',
    spritesheet: 'pavements',
    frame: 8,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Pebble Tile 2',
    spritesheet: 'pavements',
    frame: 9,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Pebble Tile 3',
    spritesheet: 'pavements',
    frame: 10,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Pebble Tile 4',
    spritesheet: 'pavements',
    frame: 11,
    cost: 5,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 1',
    spritesheet: 'pavements',
    frame: 12,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 2',
    spritesheet: 'pavements',
    frame: 13,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 3',
    spritesheet: 'pavements',
    frame: 14,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 4',
    spritesheet: 'pavements',
    frame: 15,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 5',
    spritesheet: 'pavements',
    frame: 16,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 6',
    spritesheet: 'pavements',
    frame: 17,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 7',
    spritesheet: 'pavements',
    frame: 18,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 8',
    spritesheet: 'pavements',
    frame: 19,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 9',
    spritesheet: 'pavements',
    frame: 20,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 10',
    spritesheet: 'pavements',
    frame: 21,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 11',
    spritesheet: 'pavements',
    frame: 22,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
  {
    name: 'Polished Tile 12',
    spritesheet: 'pavements',
    frame: 23,
    cost: 10,
    offsetX: 0,
    offsetY: 0,
    cells: [[0, 0]],
  },
];

export default ITEMS;
