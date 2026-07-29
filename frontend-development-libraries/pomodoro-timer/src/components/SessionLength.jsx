import { convertSecondsToMinutes, increment, decrement } from "../utils/timerUtils.js"

const SessionLength = ({ state, setState }) => {
  return (
    <div className="box">
      <div id="session-label">Session Length</div>
      <div>
        <span
          id="session-increment"
          onClick={() => increment(state, setState, "sessionLength")}
        >
          <i className="button fa-sharp fa-solid fa-arrow-up fa-2xl"></i>
        </span>
        <span id="session-length">{convertSecondsToMinutes(state.sessionLength)}</span>
        <span
          id="session-decrement"
          onClick={() => decrement(state, setState, "sessionLength")}
        >
          <i className="button fa-sharp fa-solid fa-arrow-down fa-2xl"></i>
        </span>
      </div>
    </div>
  );
};

export default SessionLength