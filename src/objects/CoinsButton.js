import { increaseByAmount } from '../reducers/coinsReducer';
import store from '../store';

import Button from './Button';

let textObj;

const selectAmt = (state) => state.coins.amount;

let currentAmt = selectAmt(store.getState());

const handleAmtChange = () => {
  const previousAmt = currentAmt;
  currentAmt = selectAmt(store.getState());

  if (textObj != null && (previousAmt !== currentAmt)) {
    textObj.text = currentAmt;
  }
};

store.subscribe(handleAmtChange);

export default function CoinsButton(scene) {
  // create coin button on top left (x, y) => (1475, 50)
  const x = 1475;
  const y = 70;

  const coinsButton = new Button(scene, x, y, 'coinsbutton').setDownTexture('coinsbutton');
  coinsButton.depth = 800;
  coinsButton.scale = 0.35;
  coinsButton.setButtonName('Coins');
  coinsButton.setOnDownCallback(() => store.dispatch(increaseByAmount(300)));

  textObj = scene.add.text(x - 25, y - 15, currentAmt, {
    fontFamily: 'Arial',  // TODO: change font
    fontSize: 28,
    color: '#000'
  });
  textObj.depth = 850;

  return coinsButton;
}