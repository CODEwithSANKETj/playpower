import { TOGGLE_THEME } from "./actiontypes";


const initialState = {
  theme: 'light', 
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light', 
      };
    default:
      return state;
  }
};

export default Reducer;
