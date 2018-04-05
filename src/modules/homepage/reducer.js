import { List, Record } from 'immutable';
import { SET_QUESTIONS, SET_QUESTION_TYPE_FILTER } from './constants';

const ModuleStateRecord = Record({
  questions: List(),
  questionTypeFilter: 'unanswered'
});

const initialModuleState = new ModuleStateRecord();

const QuestionRecord = Record({
  author: null,
  id: null,
  optionOne: null,
  optionTwo: null,
  timestamp: null
});

const OptionRecord = Record({
  text: null,
  votes: []
});

export default function homepageReducer (moduleState = initialModuleState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_QUESTIONS: {
      return moduleState.set('questions', transformQuestions(payload.questions));
    }

    case SET_QUESTION_TYPE_FILTER: {
      return moduleState.set('questionTypeFilter', payload.questionTypeFilter);
    }

    default:
      return moduleState;
  }
}

function transformQuestions (questions) {
  return List(Object.values(questions).map(question => new QuestionRecord({
    ...question,
    optionOne: new OptionRecord(question.optionOne),
    optionTwo: new OptionRecord(question.optionTwo)
  })));
}
