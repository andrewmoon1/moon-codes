/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { codeService } from '../services';

function createCodeSuccess() {
  return {
    type: types.CREATE_CODE_SUCCESS
  };
}

function createCodeFailure(data) {
  return {
    type: types.CREATE_CODE_FAILURE,
    id: data.id,
    error: data.error
  };
}

function createCodeRequest(data) {
  return {
    type: types.CREATE_CODE_REQUEST,
    id: data.id,
    code: data.code
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

export function submitCode() {
  return (dispatch, getState) => {
    const { code } = getState();
    const id = md5.hash(code.title);

    const data = {
      id,
      code: JSON.stringify(code.savedAreas),
    };

    // First dispatch an optimistic update
    dispatch(createCodeRequest(data));
    return codeService().createCode({ id, data })
      .then((res) => {
        if (res.status === 200) {
          return dispatch(createCodeSuccess());
        }
      })
      .catch(() => {
        return dispatch(
          createCodeFailure({
            id,
            error: 'Something went wrong with the code submission'
          })
        );
      });
  };
}
