const LegendToggle = (props) => {
    return (
        <div id="legend">
            <label className="switch">
                <input type="checkbox" onChange={props.updateLegend} />
                <span className="slider round"></span>
            </label>
            <span id="legend-text">Show Legend</span>
        </div>
    );
}

export default LegendToggle;