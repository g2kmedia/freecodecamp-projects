import initialState from "./initialState";
import { UPDATE_LEGEND, UPDATE_VOLUME, UPDATE_CURRENT_TRACK } from "./actionTypes";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LEGEND:
      return {
        ...state,
        showLegend: !state.showLegend
      };
    case UPDATE_VOLUME:
      return {
        ...state,
        volume: action.payload
      };
    case UPDATE_CURRENT_TRACK:
      return {
        ...state,
        currentTrack: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
