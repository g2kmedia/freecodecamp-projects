import { UPDATE_LEGEND, UPDATE_VOLUME, UPDATE_CURRENT_TRACK } from "./actionTypes";

export const updateLegend = () => ({
    type: UPDATE_LEGEND
});

export const updateVolume = (newVolume) => ({
    type: UPDATE_VOLUME,
    payload: newVolume
});

export const updateCurrentTrack = (audioName) => ({
    type: UPDATE_CURRENT_TRACK,
    payload: audioName
});
