import Phaser from 'phaser';

import closebutton from '../assets/game_menu/close_button.png';
import takequiz from '../assets/game_menu/takequiz_longbutton.png';
import tick from '../assets/game_menu/tick_button.png';
import quizboard from '../assets/QuizboardBase.png';
import Button from '../objects/Button';
import { reduceBuildTime } from '../reducers/houseReducer';
import { completeQuiz, setCurrentQuiz } from '../reducers/quizReducer';
import buttonclick from '../sounds/buttonclick.mp3';
import buttonhover from '../sounds/buttonhover.mp3';
import correct from '../sounds/success.mp3';
import wrong from '../sounds/wrong.mp3';
import store from '../store';
import {
  DEFAULT_SFX_CONFIG,
  QUIZ_ALL_COMPLETED,
  QUIZ_ALREADY_DONE_TEXT,
  QUIZ_CORRECT,
  QUIZ_WELCOME_TEXT,
  QUIZ_WRONG,
} from '../utils/constants';
import { getRandomQuiz, QUIZZES } from '../utils/quizzes';

export class QuizScene extends Phaser.Scene {
  screenCenterX;

  screenCenterY;

  question;

  closeButton;

  downSfx;

  overSfx;

  correctSfx;

  wrongSfx;

  introText;

  introButton;

  questionText;

  option1Button;

  option1Text;

  option2Button;

  option2Text;

  option3Button;

  option3Text;

  option4Button;

  option4Text;

  constructor() {
    super({
      key: 'QuizScene',
    });
  }

  preload() {
    this.load.image('quizboard', quizboard);
    this.load.image('closebutton', closebutton);
    this.load.image('takequiz', takequiz);
    this.load.image('tick', tick);
    this.load.audio('buttonhover', buttonhover);
    this.load.audio('buttonclick', buttonclick);
    this.load.audio('wrong', wrong);
    this.load.audio('correct', correct);
    this.screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    this.screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
  }

  create() {
    this.downSfx = this.sound.add('buttonclick');
    this.overSfx = this.sound.add('buttonhover');
    this.correctSfx = this.sound.add('correct');
    this.wrongSfx = this.sound.add('wrong');

    this.add
      .image(this.screenCenterX, this.screenCenterY + 10, 'quizboard')
      .setScale(0.85);

    this.closeButton = new Button(
      this,
      this.screenCenterX + 390,
      this.screenCenterY - 240,
      'closebutton',
    )
      .setDownTexture('closebutton')
      .setButtonName('Close')
      .setDepth(800)
      .setScale(0.6)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.closeButton.on('pointerup', () => {
      this.scene.stop('QuizScene');
      this.scene.resume('HabitatHeroesScene');
    });

    this.introText = this.add.text(
      this.screenCenterX,
      this.screenCenterY - 80,
      '',
      {
        fontFamily: 'Quicksand',
        fontSize: 26,
        color: '#fff',
        lineSpacing: 12,
        strokeThickness: 1,
        align: 'center',
      },
    );

    this.add.existing(this.closeButton);
    if (store.getState().quiz.currentQuizId != null) {
      [this.question] = QUIZZES.filter(
        (q) => q.id === store.getState().quiz.currentQuizId,
      );
      this.showQuestion();
      this.closeButton.setDisabled(true);
    } else {
      this.showIntro();
    }
  }

  static lastAttemptWasWithinOneDay() {
    const { lastCompletionTime } = store.getState().quiz;
    if (lastCompletionTime == null) {
      return false;
    }
    const currentTime = new Date();
    return currentTime.getTime() - lastCompletionTime < 1000 * 60 * 60 * 24;
  }

  showIntro() {
    const hasAlreadyDoneQuiz = QuizScene.lastAttemptWasWithinOneDay();
    this.question = getRandomQuiz(store.getState().quiz.completedQuizzes);
    // eslint-disable-next-line no-nested-ternary
    this.introText.text = hasAlreadyDoneQuiz
      ? QUIZ_ALREADY_DONE_TEXT
      : this.question == null
      ? QUIZ_ALL_COMPLETED
      : QUIZ_WELCOME_TEXT;
    this.introText.x = this.screenCenterX - this.introText.width / 2;
    this.introButton = new Button(
      this,
      this.screenCenterX,
      this.screenCenterY + 120,
      'takequiz',
    )
      .setDownTexture('takequiz')
      .setButtonName(
        // eslint-disable-next-line no-nested-ternary
        hasAlreadyDoneQuiz
          ? "You've done a quiz recently!"
          : this.question == null
          ? 'You have already completed all quizzes!'
          : 'Begin Quiz!',
      )
      .setDepth(800)
      .setScale(0.6)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx)
      .setDisabled(hasAlreadyDoneQuiz || this.question == null)
      .clearTint();
    this.introButton.on('pointerup', () => {
      this.showQuestion();
    });
    this.add.existing(this.introButton);
  }

  showQuestion() {
    if (this.introButton) {
      this.introButton.visible = false;
    }
    store.dispatch(setCurrentQuiz(this.question.id));
    this.introText.text = this.question.question;
    this.introText.x = this.screenCenterX - this.introText.width / 2;
    this.introText.y = 270;
    this.closeButton.setDisabled(true);

    const options = [...this.question.options].sort(() => Math.random() - 0.5);
    this.option1Button = new Button(
      this,
      this.screenCenterX - 300,
      this.screenCenterY + 25,
      'tick',
    )
      .setDownTexture('tick')
      .setButtonName('Option 1')
      .setDepth(800)
      .setScale(0.3)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.option1Button.on('pointerup', () => this.selectOption(options[0].id));

    this.option1Text = this.add.text(
      this.screenCenterX - 260,
      this.screenCenterY + 25,
      options[0].text,
      {
        fontFamily: 'Quicksand',
        fontSize: 22,
        color: '#fff',
        lineSpacing: 12,
        strokeThickness: 1,
        align: 'left',
      },
    );
    this.option1Text.y = this.screenCenterY + 25 - this.option1Text.height / 2;

    this.option2Button = new Button(
      this,
      this.screenCenterX + 50,
      this.screenCenterY + 25,
      'tick',
    )
      .setDownTexture('tick')
      .setButtonName('Option 2')
      .setDepth(800)
      .setScale(0.3)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.option2Button.on('pointerup', () => this.selectOption(options[1].id));

    this.option2Text = this.add.text(
      this.screenCenterX + 90,
      this.screenCenterY + 25,
      options[1].text,
      {
        fontFamily: 'Quicksand',
        fontSize: 22,
        color: '#fff',
        lineSpacing: 12,
        strokeThickness: 1,
        align: 'left',
      },
    );
    this.option2Text.y = this.screenCenterY + 25 - this.option2Text.height / 2;

    this.option3Button = new Button(
      this,
      this.screenCenterX - 300,
      this.screenCenterY + 175,
      'tick',
    )
      .setDownTexture('tick')
      .setButtonName('Option 3')
      .setDepth(800)
      .setScale(0.3)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.option3Button.on('pointerup', () => this.selectOption(options[2].id));

    this.option3Text = this.add.text(
      this.screenCenterX - 260,
      this.screenCenterY + 175,
      options[2].text,
      {
        fontFamily: 'Quicksand',
        fontSize: 22,
        color: '#fff',
        lineSpacing: 12,
        strokeThickness: 1,
        align: 'left',
      },
    );
    this.option3Text.y = this.screenCenterY + 175 - this.option3Text.height / 2;

    this.option4Button = new Button(
      this,
      this.screenCenterX + 50,
      this.screenCenterY + 175,
      'tick',
    )
      .setDownTexture('tick')
      .setButtonName('Option 4')
      .setDepth(800)
      .setScale(0.3)
      .setDownSfx(this.downSfx)
      .setOverSfx(this.overSfx);
    this.option4Button.on('pointerup', () => this.selectOption(options[3].id));

    this.option4Text = this.add.text(
      this.screenCenterX + 90,
      this.screenCenterY + 175,
      options[3].text,
      {
        fontFamily: 'Quicksand',
        fontSize: 22,
        color: '#fff',
        lineSpacing: 12,
        strokeThickness: 1,
        align: 'left',
      },
    );
    this.option4Text.y = this.screenCenterY + 175 - this.option4Text.height / 2;

    this.add.existing(this.option1Button);
    this.add.existing(this.option2Button);
    this.add.existing(this.option3Button);
    this.add.existing(this.option4Button);
  }

  selectOption(id) {
    store.dispatch(completeQuiz());
    if (id === this.question.correctOptionId) {
      store.dispatch(reduceBuildTime());
      this.correctSfx.play(DEFAULT_SFX_CONFIG);
      this.introText.text = QUIZ_CORRECT;
    } else {
      this.wrongSfx.play(DEFAULT_SFX_CONFIG);
      this.introText.text = QUIZ_WRONG;
    }
    this.introText.x = this.screenCenterX - this.introText.width / 2;
    this.option1Button.visible = false;
    this.option2Button.visible = false;
    this.option3Button.visible = false;
    this.option4Button.visible = false;
    this.option1Text.visible = false;
    this.option2Text.visible = false;
    this.option3Text.visible = false;
    this.option4Text.visible = false;
    this.closeButton.setDisabled(false);
  }
}
