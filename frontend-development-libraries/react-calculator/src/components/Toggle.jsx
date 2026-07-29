const Toggle = (props) => {
  return (
    <div id="toggle">
      <span>Formula Logic</span>
      <label className="switch">
        <input type="checkbox" onClick={props.toggleCalcLogic} />
        <span className="slider"></span>
      </label>
      <span>Immediate Logic</span>
    </div>
  );
};

export default Toggle