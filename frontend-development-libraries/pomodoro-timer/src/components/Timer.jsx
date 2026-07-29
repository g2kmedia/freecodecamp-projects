import { useRef } from "react"
import { convertSecondsToTimer } from "../utils/timerUtils.js"

const Timer = ({ state, setState }) => {
  const resetRef = useRef(null);
  
  const countdown = (duration) => {
    let remainingTime = duration;

    if (state.isTimerActive) {
      clearInterval(state.timerId);

      return setState({
        ...state,
        timerId: null,
        currentTimer: remainingTime,
        isTimerActive: false
      });
    }

    const newTimerId = setInterval(() => {
      setState((prevState) => {
        if (remainingTime <= 0) {
          const isSession = prevState.lengthType === "Session";
          const nextType = isSession ? "Break" : "Session";
          remainingTime = isSession ? prevState.breakLength : prevState.sessionLength;
          
          const audio = document.getElementById("beep").play();
          
          return {
            ...prevState,
            lengthType: nextType,
            currentTimer: remainingTime
          };
        } else {
          remainingTime--;
          return {
            ...prevState,
            currentTimer: remainingTime
          };
        }
      });
    }, 1000);

    setState((prevState) => ({
      ...prevState,
      timerId: newTimerId,
      isTimerActive: true
    }));
  };
  
  const resetTimer = () => {
    if (resetRef.current) {
      resetRef.current.classList.add("spin");
      setTimeout(() => {
        resetRef.current.classList.remove("spin");
      }, 500);
    }
    
    const audio = document.getElementById("beep");
    if (audio.play()) {
      audio.pause();
      audio.currentTime = 0;
    }
    
    clearInterval(state.timerId);
    
    setState((prevState) => ({
      breakLength: 300,
      sessionLength: 1500,
      lengthType: "Session",
      timerId: null,
      currentTimer: 1500,
      isTimerActive: false
      }));
  }

  return (
    <div id="timer">
      <div id="timer-label">{state.lengthType}</div>
      <div id="time-left">{convertSecondsToTimer(state.currentTimer)}</div>
      <div class="controls">
      <span id="start_stop" onClick={() => countdown(state.currentTimer)}>
        {state.isTimerActive ? <i class="button fa-solid fa-pause fa-2xl"></i> : <i class="button fa-solid fa-play fa-2xl"></i>}
      </span>
      <span id="reset" onClick={() => resetTimer()}><i ref={resetRef} class="button fa-solid fa-rotate-right fa-2xl"></i></span>
      </div>
      <audio id="beep" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
    </div>
  );
};

export default Timer