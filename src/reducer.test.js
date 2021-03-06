import {reducer, ActionCreator, ActionType} from "./reducer.js";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Bean`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/A`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AB`,
      artist: `Jack Sparrow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AC `,
      artist: `Jeremih Paul`,
    }],
  },
];

const mockArtistQuestion = {
  type: `artist`,
  song: {
    artist: `correct`,
    src: ``,
  },
  answers: [
    {
      artist: `correct`,
      picture: ``,
    }, {
      artist: `incorrect`,
      picture: ``,
    }, {
      artist: `incorrect-2`,
      picture: ``,
    },
  ]
};

const mockGenreQuestionCorrect = {
  type: `genre`,
  genre: `jazz`,
  answers: [
    {
      genre: `rock`,
      src: ``,
    }, {
      genre: `jazz`,
      src: ``,
    }, {
      genre: `blues`,
      src: ``,
    }, {
      genre: `blues`,
      src: ``,
    },
  ]
};

const mockGenreQuestionIncorrect = {
  type: `genre`,
  genre: `jazz`,
  answers: [
    {
      genre: `blues`,
      src: ``,
    }, {
      genre: `blues`,
      src: ``,
    }, {
      genre: `blues`,
      src: ``,
    }, {
      genre: `blues`,
      src: ``,
    },
  ]
};

const mockArtistIncorrectAnswer = {
  artist: `incorrect`,
  picture: ``,
};

const mockArtistCorrectAnswer = {
  artist: `correct`,
  picture: ``,
};

const mockGenreAnswerIncorrect = [true, true, true, true];

const mockGenreAnswerCorrect = [false, true, false, false];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
    gameTime: 5,
    questions,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  })).toEqual({
    step: 0,
    mistakes: 0,
    questions,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: -1,
    mistakes: 0,
    questions,
  });
});

it(`Reducer should increment number of mistakes if answer for artist is incorrect`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: {
      question: mockArtistQuestion,
      userAnswer: mockArtistIncorrectAnswer,
    },
  })).toEqual({
    step: -1,
    mistakes: 1,
  });
});

it(`Reducer should not increment number of mistakes if answer for artist is correct`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: {
      question: mockArtistQuestion,
      userAnswer: mockArtistCorrectAnswer,
    },
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Reducer should increment number of mistakes if answer for genre is incorrect`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: {
      question: mockGenreQuestionIncorrect,
      userAnswer: mockGenreAnswerIncorrect,
    },
  })).toEqual({
    step: -1,
    mistakes: 1,
  });
});

it(`Reducer should not increment number of mistakes if answer for genre is correct`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
    payload: {
      question: mockGenreQuestionCorrect,
      userAnswer: mockGenreAnswerCorrect,
    },
  })).toEqual({
    step: -1,
    mistakes: 0,
  });
});

it(`Action creator for incrementing step returns correct action`, () => {
  expect(ActionCreator.incrementStep()).toEqual({
    type: ActionType.INCREMENT_STEP,
    payload: 1,
  });
});
