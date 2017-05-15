/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';

export function typingText(text) {
  return {
    type: types.TYPINGTEXT,
    newSection: {
      text,
      id: 'text'
    }
  };
}

export function saveText(text, target) {
  return {
    type: types.SAVETEXT,
    newSection: {
      text,
      id: target
    }
  };
}

export function saveCode(text, target) {
  return {
    type: types.SAVETEXT,
    newSection: {
      text,
      id: 'code'
    }
  };
}

export function typingCode(text, change, target) {
  return {
    type: types.TYPINGCODE,
    newSection: {
      text,
      id: 'code'
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


export function insertItem(array, action) {
    const newArray = array.slice();
    newArray.splice(action.index, 0, action.item);
    return newArray;
}
