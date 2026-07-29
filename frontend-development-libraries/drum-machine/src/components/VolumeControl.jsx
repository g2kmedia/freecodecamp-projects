const VolumeControl = (props) => {
    const changeVolume = (event) => {
        props.updateVolume(Number(event.target.value));
    }

    return (
        <div>
            <div>Change the volume</div>
            <input id="volume" type="range" min="0" max="100" value={props.volume} onChange={changeVolume} />
            <span>Current Volume: {props.volume}%</span>
        </div>
    );
}

export default VolumeControl;