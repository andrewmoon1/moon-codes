/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';

export function typingText(text) {
  return {
    type: types.TYPINGTEXT,
    newSection: text
  };
}

export function newArea(text) {
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
