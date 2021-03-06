export const QUIZZES = [
  {
    id: 1,
    question: 'How many countries is Habitat for Humanity\ncurrently helping?',
    options: [
      {
        id: 1,
        text: '17',
      },
      {
        id: 2,
        text: '20',
      },
      {
        id: 3,
        text: '10',
      },
      {
        id: 4,
        text: '23',
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 2,
    question: 'Which is NOT a reason why decent housing is important?',
    options: [
      {
        id: 1,
        text: 'Removes barriers to\nopportunity',
      },
      {
        id: 2,
        text: 'Gives a strong foundation\nto a better life',
      },
      {
        id: 3,
        text: 'Helps those stuck\nin extreme poverty',
      },
      {
        id: 4,
        text: "It's a lucrative business",
      },
    ],
    correctOptionId: 4,
  },
  {
    id: 3,
    question:
      'Habitat has supported close to how many individuals\n in the Asia-Pacific Region since 1983?',
    options: [
      {
        id: 1,
        text: '78 thousand',
      },
      {
        id: 2,
        text: '2.4 million',
      },
      {
        id: 3,
        text: '980 thousand',
      },
      {
        id: 4,
        text: '1.6 million',
      },
    ],
    correctOptionId: 2,
  },
  {
    id: 4,
    question:
      'Which of the following is not a correct way\nof supporting Habitat?',
    options: [
      {
        id: 1,
        text: 'Raise awareness',
      },
      {
        id: 2,
        text: 'Raise money',
      },
      {
        id: 3,
        text: 'Join a build team',
      },
      {
        id: 4,
        text: 'Rent out your house',
      },
    ],
    correctOptionId: 4,
  },
  {
    id: 5,
    question:
      "How many families were helped through Habitat's\n program for the 2004 Indian Ocean tsunami?",
    options: [
      {
        id: 1,
        text: '25 thousand',
      },
      {
        id: 2,
        text: '15 thousand',
      },
      {
        id: 3,
        text: '40 thousand',
      },
      {
        id: 4,
        text: '1 thousand',
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 6,
    question: 'How many families were served in Singapore?',
    options: [
      {
        id: 1,
        text: '3 thousand',
      },
      {
        id: 2,
        text: '2 thousand',
      },
      {
        id: 3,
        text: '5 hundred',
      },
      {
        id: 4,
        text: '1 thousand',
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 7,
    question: 'What is BlockWalk about?',
    options: [
      {
        id: 1,
        text: 'Sewing blankets for\nlow-income families',
      },
      {
        id: 2,
        text: 'Cleaning up your\nneighbourhood',
      },
      {
        id: 3,
        text: 'Painting houses',
      },
      {
        id: 4,
        text: 'Exterminating pests',
      },
    ],
    correctOptionId: 2,
  },
  {
    id: 8,
    question:
      'When did direct project implementation begin\nin Myanmar for Habitat for Humanity?',
    options: [
      {
        id: 1,
        text: '2016',
      },
      {
        id: 2,
        text: '2014',
      },
      {
        id: 3,
        text: '2008',
      },
      {
        id: 4,
        text: '2011',
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 9,
    question:
      'In 2014, close to how many % of housing units in Myanmar\nwere made of non-durable wood and bamboo?',
    options: [
      {
        id: 1,
        text: '81%',
      },
      {
        id: 2,
        text: '76%',
      },
      {
        id: 3,
        text: '43%',
      },
      {
        id: 4,
        text: '25%',
      },
    ],
    correctOptionId: 1,
  },
  {
    id: 10,
    question:
      'Around how many % of Cambodians live in extreme\npoverty and lack decent housing conditions?',
    options: [
      {
        id: 1,
        text: '12%',
      },
      {
        id: 2,
        text: '8%',
      },
      {
        id: 3,
        text: '3%',
      },
      {
        id: 4,
        text: '16%',
      },
    ],
    correctOptionId: 4,
  },
];

export const getRandomQuiz = (completedQuizzes) => {
  const incompleteQuizzes = QUIZZES.filter(
    (q) => !completedQuizzes.includes(q.id),
  );
  if (incompleteQuizzes.length === 0) {
    return null;
  }
  return incompleteQuizzes[
    // Just in case, we do a min
    Math.min(
      Math.floor(Math.random() * incompleteQuizzes.length),
      incompleteQuizzes.length - 1,
    )
  ];
};
