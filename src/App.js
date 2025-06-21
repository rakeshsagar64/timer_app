// App.js
import React, { useState } from "react";
import Home from "./Home";
import Timer from "./Timer";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [task, setTask] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [endTime, setEndTime] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const startTimer = (taskInput, minutesInput) => {
    const parsedMinutes = parseInt(minutesInput, 10);
    if (!taskInput.trim() || parsedMinutes <= 0) return;

    setTask(taskInput);
    setMinutes(parsedMinutes);
    setEndTime(Date.now() + parsedMinutes * 60 * 1000); // ✅ Set endTime based on "Go" click
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
      setEndTime(null);
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
          setTask={setTask}
          setMinutes={setMinutes}
        />
      </div>

      <div
        className={`screen timer-screen ${
          screen === "timer" && !transitioning ? "screen-active" : ""
        }`}
      >
        {endTime && (
          <Timer
            task={task}
            endTime={endTime}
            goBackAndReset={goBackAndReset}
          />
        )}
      </div>
    </div>
  );
}

export default App;
