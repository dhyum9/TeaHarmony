import { csrfFetch } from "./csrf";


// TYPE CONSTANTS
const GET_TEAS = "teas/getTeas";
const GET_TEA = "teas/getTea";
const CREATE_TEA = "teas/createTea";


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

const createTea = (tea) => {
  return {
    type: CREATE_TEA,
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

export const thunkCreateTea = (tea) => async (dispatch) => {
  const res = await csrfFetch("/api/teas/", {
    method: "POST",
    body: JSON.stringify(tea)
  });

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    const errors = await res.json();
    return errors;
  }
};

export const thunkGetUserTeas = () => async (dispatch) => {
  const res = await csrfFetch("/api/teas/current");

  if (res.ok) {
    const teas = await res.json();
    dispatch(getTeas(teas));
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

    case CREATE_TEA:
      newState = {
        ...state,
        allTeas: { ...state.allTeas },
        singleTea: { ...action.tea },
      };
      newState.allTeas[action.tea.id] = action.tea;
      return newState;

    default:
      return state;
  }
};

export default teaReducer;
