import { csrfFetch } from "./csrf";

// TYPE CONSTANTS

const GET_TEA_TASTINGNOTES = "tastingnotes/getTeaTastingNotes";
const GET_USER_TASTINGNOTES = "tastingnotes/getUserTastingNotes"
// const CREATE_TASTINGNOTE = "tastingnotes/createTastingNote";


// ACTION CREATORS

const getTeaTastingNotes = (tastingnotes) => {
  return {
      type: GET_TEA_TASTINGNOTES,
      tastingnotes
  }
}

const getUserTastingNotes = (tastingnotes) => {
  return {
      type: GET_USER_TASTINGNOTES,
      tastingnotes
  }
}

// const createTastingNote = (tastingnote) => {
//   return {
//       type: CREATE_TASTINGNOTE,
//       tastingnote,
//   }
// }


// THUNK ACTION CREATORS

export const thunkGetTeaTastingNotes = (teaId) => async (dispatch) => {

  const res = await csrfFetch(`/api/teas/${teaId}/tastingnotes`);

  if (res.ok) {
      const tastingnotes = await res.json();
      dispatch(getTeaTastingNotes(tastingnotes));
      return res;
  } else {
      const errors = await res.json();
      return errors;
  }
};

export const thunkGetUserTastingNotes = () => async (dispatch) => {

  const res = await csrfFetch(`/api/tastingnotes/current`);

  if (res.ok) {
      const tastingnotes = await res.json();
      dispatch(getUserTastingNotes(tastingnotes));
      return res;
  } else {
      const errors = await res.json();
      return errors;
  }
};

export const thunkCreateTastingNote = (note, teaId) => async (dispatch) => {
  const res = await csrfFetch(`/api/teas/${teaId}/tastingnotes`, {
    method: "POST",
    body: JSON.stringify(note)
  });

  if (res.ok) {
    const data = await res.json();
    await dispatch(thunkGetTeaTastingNotes(teaId))
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};


// REDUCERS

const initialState = { tea: {}, user: {} };

const tastingNotesReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case GET_TEA_TASTINGNOTES:
            newState = {...state, tea: {}}
            action.tastingnotes.tastingnotes.forEach((tastingnote) => {
                newState.tea[tastingnote.id] = tastingnote;
            });
            return newState;

        case GET_USER_TASTINGNOTES:
          newState = {...state, user: {}}
          action.tastingnotes.tastingnotes.forEach((tastingnote) => {
              newState.user[tastingnote.id] = tastingnote;
          });
          return newState;

        default:
            return state;
    }
};

export default tastingNotesReducer;
