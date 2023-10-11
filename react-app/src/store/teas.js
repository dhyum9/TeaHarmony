import { csrfFetch } from "./csrf";


// TYPE CONSTANTS
const GET_TEAS = "teas/getTeas";
const GET_TEA = "teas/getTea";
const CREATE_TEA = "teas/createTea";
const UPDATE_TEA = "teas/updateTea";
const DELETE_TEA = "teas/deleteTea";


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

const updateTea = (tea) => {
  return {
    type: UPDATE_TEA,
    tea,
  };
};

const deleteTea = (teaId) => {
  return {
    type: DELETE_TEA,
    teaId,
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

export const thunkUpdateTea = (tea, teaId) => async (dispatch) => {
    const res = await csrfFetch(`/api/teas/${teaId}`, {
      method: "PUT",
      body: JSON.stringify(tea),
    });

    if (res.ok) {
      const data = await res.json();
      dispatch(updateTea(data));
      return data;
    } else {
      const errors = await res.json();
      return errors;
    }
  };

  export const thunkDeleteTea = (teaId) => async (dispatch) => {
    const res = await csrfFetch(`/api/teas/${teaId}`, {
      method: "DELETE",
    });

    dispatch(deleteTea(teaId));
    return res;
  };

// REDUCERS
const initialState = { allTeas: {}, singleTea: {} };

const teaReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {

    case GET_TEAS:
      newState = { ...state, allTeas: {} };
      action.teas.teas.forEach((tea, index) => {
        // console.log(index, tea)
        newState.allTeas[index] = tea;
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

      case UPDATE_TEA:
        newState = {
          ...state,
          allTeas: {...state.allTeas},
          singleTea: { ...action.tea },
        };
        newState.allTeas[action.tea.id] = action.tea;
        return newState;

      case DELETE_TEA:
        newState = {
          ...state,
          allTeas: { ...state.allTeas },
          singleTea: {...state.singleTea},
        };
        delete newState.allTeas[action.teaId];
        return newState;

    default:
      return state;
  }
};

export default teaReducer;
