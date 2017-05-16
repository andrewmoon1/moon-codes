/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';

export function saveText(text, target) {
  return {
    type: types.SAVETEXT,
    newSection: {
      text,
      id: target
    }
  };
}

export function typingTitle(text) {
  return {
    type: types.TYPINGTITLE,
    title: text,
  };
}

export function newArea(text, target, target1) {
  return {
    type: types.NEWAREA,
    newSection: text
  };
}

export function submitCode(text) {
  // return {
  //   type: types.NEWAREA,
  //   newSection: text
  // };
}
