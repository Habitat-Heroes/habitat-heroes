import {VILLAGER_NAME_MAPPINGS,VILLAGER1_COORD, VILLAGER2_COORD, VILLAGER3_COORD} from '../utils/constants';

import Button from './Button';

export default function Villager(scene, villagerIdx, downSfx, overSfx) {
  let x;
  let y;
  switch(villagerIdx) {
    case 1:
      [x, y] = VILLAGER1_COORD;
      break;
    case 2:
      [x, y] = VILLAGER2_COORD;
      break;
    case 3:
      [x, y] = VILLAGER3_COORD;
      break;
    default:
      break;
  }
  const villager = new Button(scene, x, y, `villager${  villagerIdx}`)
    .setDepth(y + 100)
    .setScale(2)
    .setDownTexture(`villager${  villagerIdx}`)
    .setButtonName(`Talk to ${  VILLAGER_NAME_MAPPINGS[villagerIdx]}`)
    .setUpTint(0xffffff)
    .setDownTint(0xffffff)
    .setOverTint(0xffffff)
    .setTint(0xffffff)
    .setDisabledTint(0xffffff)
    .setDownSfx(downSfx)
    .setOverSfx(overSfx)
    .setOnDownCallback(() => {
    scene.scene.launch('VillagerConversationScene', {villager: villagerIdx});
    scene.scene.pause('HabitatHeroesScene');
    });
  return villager;
}
