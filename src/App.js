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
    setMinutes(parseInt(minutesInput));
    setTransitioning(true);
    setTimeout(() => {
      setScreen("timer");
      setTransitioning(false);
    }, 600);
  };

  const goBack = () => {
    setTransitioning(true);
    setTimeout(() => {
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
        <Home startTimer={startTimer} />
      </div>

      <div
        className={`screen timer-screen ${
          screen === "timer" && !transitioning ? "screen-active" : ""
        }`}
      >
        <Timer task={task} minutes={minutes} goBack={goBack} />
      </div>
    </div>
  );
}

export default App;
