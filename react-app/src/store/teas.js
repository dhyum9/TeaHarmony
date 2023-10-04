import { csrfFetch } from "./csrf";


// TYPE CONSTANTS
const GET_TEAS = "teas/getTeas";
const GET_TEA = "restaurants/getTea";


// ACTION CREATORS
const getTeas = (teas) => {
  return {
    type: GET_TEAS,
    teas,
  };
};

const getTea = (tea) => {
  return {
    type: GET_TEA,
    tea,
  };
};


// THUNK ACTION CREATORS
export const thunkGetTeas = () => async (dispatch) => {
  const res = await csrfFetch("/api/teas/");

  if (res.ok) {
    const teas = await res.json();
    dispatch(getTeas(teas));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetTeaInfo = (teaId) => async (dispatch) => {
  const res = await csrfFetch(`/api/teas/${teaId}`);

  if (res.ok) {
    const tea = await res.json();
    dispatch(getTea(tea));
    return res;
  } else {
    const errors = await res.json();
    return errors;
  }
};


// REDUCERS
const initialState = { allTeas: {}, singleTea: {} };

const teaReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case GET_TEAS:
      newState = { ...state, allTeas: {} };
      action.teas.teas.forEach((tea) => {
        newState.allTeas[tea.id] = tea;
      });
      return newState;

    case GET_TEA:
      newState = { ...state, singleTea: {} };
      newState.singleTea = action.tea;
      return newState;

    default:
      return state;
  }
};

export default teaReducer;
