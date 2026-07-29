import { convertSecondsToMinutes, increment, decrement } from "../utils/timerUtils.js"

const BreakLength = ({ state, setState }) => {
  return (
    <div className="box">
      <div id="break-label">Break Length</div>
      <div>
        <span
          id="break-increment"
          onClick={() => increment(state, setState, "breakLength")}
        >
          <i className="button fa-sharp fa-solid fa-arrow-up fa-2xl"></i>
        </span>
        <span id="break-length">{convertSecondsToMinutes(state.breakLength)}</span>
        <span
          id="break-decrement"
          onClick={() => decrement(state, setState, "breakLength")}
        >
          <i className="button fa-sharp fa-solid fa-arrow-down fa-2xl"></i>
        </span>
      </div>
    </div>
  );
};

export default BreakLength