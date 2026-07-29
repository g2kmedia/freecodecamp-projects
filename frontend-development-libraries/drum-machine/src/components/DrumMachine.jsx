import React from "react";
import { connect } from "react-redux";
import Key from "./Key.jsx";
import LegendToggle from "./LegendToggle.jsx";
import VolumeControl from "./VolumeControl.jsx";
import Display from "./Display.jsx";
import { updateLegend, updateVolume, updateCurrentTrack } from "../redux/actions.js";

class DrumMachine extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="drum-machine">
                <div id="controls">
                    <ConnectedLegendToggle />
                    <ConnectedVolumeControl />
                </div>
                <div id="padkeys">
                    <ConnectedKey padKey="pad1" />
                    <ConnectedKey padKey="pad2" />
                    <ConnectedKey padKey="pad3" />
                    <ConnectedKey padKey="pad4" />
                    <ConnectedKey padKey="pad5" />
                    <ConnectedKey padKey="pad6" />
                    <ConnectedKey padKey="pad7" />
                    <ConnectedKey padKey="pad8" />
                    <ConnectedKey padKey="pad9" />
                </div>
                <ConnectedDisplay />
            </div>
        );
    }
}

// Connect Components to Redux
const mapStateToKey = (state, ownProps) => ({
  showLegend: state.showLegend,
  letter: state[ownProps.padKey].letter,
  name: state[ownProps.padKey].name,
  audio: state[ownProps.padKey].audio,
  volume: state.volume
});

const mapStateToToggle = (state) => ({
  showLegend: state.showLegend
});

const mapStateToVolume = (state) => ({
  volume: state.volume
});

const mapStateToDisplay = (state) => ({
  currentTrack: state.currentTrack
});

const mapDispatchToToggle = (dispatch) => ({
  updateLegend: () => dispatch(updateLegend())
});

const mapDispatchToVolume = (dispatch) => ({
  updateVolume: (newVolume) => dispatch(updateVolume(newVolume))
});

const mapDispatchToKey = (dispatch) => ({
  updateCurrentTrack: (audioName) => dispatch(updateCurrentTrack(audioName))
});

const ConnectedKey = connect(mapStateToKey, mapDispatchToKey)(Key);
const ConnectedLegendToggle = connect(mapStateToToggle, mapDispatchToToggle)(LegendToggle);
const ConnectedVolumeControl = connect(mapStateToVolume, mapDispatchToVolume)(VolumeControl);
const ConnectedDisplay = connect(mapStateToDisplay)(Display);

export default DrumMachine;