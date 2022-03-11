import { increaseByAmount } from '../reducers/coinsReducer';
import store from '../store';
import { COINS_BUTTON_CENTER } from '../utils/constants';

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
  const [x, y] = COINS_BUTTON_CENTER;

  const coinsButton = new Button(scene, x, y, 'coinsbutton').setDownTexture('coinsbutton');
  coinsButton.depth = 800;
  coinsButton.scale = 0.35;
  coinsButton.setButtonName('Coins');
  coinsButton.setOnDownCallback(() => store.dispatch(increaseByAmount(300)));

  // eslint-disable-next-line no-undef
  WebFont.load({
    google: {
      families: ['Graduate']
    },
    active() {
      textObj = scene.add.text(x - 30, y - 18, currentAmt, {
        fontFamily: 'Graduate',
        fontSize: 28,
        color: '#fff',
        align: 'right',
        strokeThickness: 2
      }).setShadow(2, 2, '#333333', 2, false, true);
      textObj.depth = 850;
    }
  });

  return coinsButton;
}
