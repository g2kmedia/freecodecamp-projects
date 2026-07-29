export const convertSecondsToMinutes = (time) => {
  return Math.floor(time / 60);
}


export const convertSecondsToTimer = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const minutesToDisplay = minutes > 9 ? minutes : "0" + minutes;
  const secondsToDisplay = seconds > 9 ? seconds : "0" + seconds;

  const timeToDisplay = minutesToDisplay + ":" + secondsToDisplay;

  return timeToDisplay;
};


export const increment = (state, setState, lengthType) => {
  if (state[lengthType] >= 3600) {
    return;
  }

  setState((prevState) => {
    const isSameType =
      (prevState.lengthType === "Session" && lengthType === "sessionLength") ||
      (prevState.lengthType === "Break" && lengthType === "breakLength");
    
    const wasTimerStarted = prevState.currentTimer === prevState.sessionLength || prevState.currentTimer === prevState.breakLength;

    return {
      ...prevState,
      [lengthType]: prevState[lengthType] + 60,
      currentTimer: isSameType && !prevState.isTimerActive && wasTimerStarted
        ? prevState[lengthType] + 60
        : prevState.currentTimer
    };
  });
};

export const decrement = (state, setState, lengthType) => {
  if (state[lengthType] <= 60) {
    return;
  }

  setState((prevState) => {
    const isSameType =
      (prevState.lengthType === "Session" && lengthType === "sessionLength") ||
      (prevState.lengthType === "Break" && lengthType === "breakLength");
    
    const wasTimerStarted = prevState.currentTimer === prevState.sessionLength || prevState.currentTimer === prevState.breakLength;

    return {
      ...prevState,
      [lengthType]: prevState[lengthType] - 60,
      currentTimer: isSameType && !prevState.isTimerActive && wasTimerStarted
        ? prevState[lengthType] - 60
        : prevState.currentTimer
    };
  });
};