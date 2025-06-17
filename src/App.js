// App.js
import React, { useState } from "react";
import Home from "./Home";
import Timer from "./Timer";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [task, setTask] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const startTimer = (taskInput, minutesInput) => {
    setTask(taskInput);
    setMinutes(parseInt(minutesInput, 10));
    setTransitioning(true);
    setTimeout(() => {
      setScreen("timer");
      setTransitioning(false);
    }, 600);
  };

  const goBackAndReset = () => {
    setTransitioning(true);
    setTimeout(() => {
      setTask("");
      setMinutes(0);
      setScreen("home");
      setTransitioning(false);
    }, 600);
  };

  return (
    <div className="app-container">
      <div
        className={`screen home-screen ${
          screen === "home"
            ? transitioning
              ? "screen-exit"
              : "screen-active"
            : ""
        }`}
      >
        <Home
          startTimer={startTimer}
          task={task}
          minutes={minutes}
          setTask={setTask} // ✅ Add this
          setMinutes={setMinutes} // ✅ Add this
        />
      </div>

      <div
        className={`screen timer-screen ${
          screen === "timer" && !transitioning ? "screen-active" : ""
        }`}
      >
        <Timer task={task} minutes={minutes} goBackAndReset={goBackAndReset} />
      </div>
    </div>
  );
}

export default App;
