import { combineReducers } from 'redux';
import * as types from '../types';

const area = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.NEWAREA:
      return action.newSection;
    default:
      return state;
  }
};

const areas = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.NEWAREA:
      return [...state, area(undefined, action)];
    default:
      return state;
  }
};

const savedAreas = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.SAVETEXT:
      return [...state, {id: action.id, text: action.text}];
    default:
      return state;
  }
};

const newArea = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TYPINGTEXT:
      return action.newSection;
      case types.TYPINGCODE:
      return action.newSection;
    default:
      return state;
  }
};

const codeReducer = combineReducers({
  newArea,
  areas,
  savedAreas
});

export default codeReducer;
