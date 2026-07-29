import { useState } from "react"
import "./App.scss"
import BreakLength from "./components/BreakLength.jsx"
import SessionLength from "./components/SessionLength.jsx"
import Timer from "./components/Timer.jsx"

function App() {
  const [state, setState] = useState({
    breakLength: 300,
    sessionLength: 1500,
    lengthType: "Session",
    timerId: null,
    currentTimer: 1500,
    isTimerActive: false
  });

  return (
    <div>
      <div className="container">
        <BreakLength state={state} setState={setState} />
        <SessionLength state={state} setState={setState} />
      </div>
      <Timer state={state} setState={setState} />
    </div>
  );
}

export default App
