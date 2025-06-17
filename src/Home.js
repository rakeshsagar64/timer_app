import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function Home({ startTimer, triggerTransition }) {
  const [task, setTask] = useState("");
  const [minutes, setMinutes] = useState("");
  const taskInputRef = useRef(null);

  useEffect(() => {
    taskInputRef.current.focus();
  }, []);

  const handleStart = () => {
    if (task && minutes > 0) {
      startTimer(task, minutes);
    }
  };

  const showButton = task.trim() !== "" && parseInt(minutes) > 0;

  return (
    <div className="home-screen refined-layout">
      <p className="label-text">I would like to</p>
      <input
        ref={taskInputRef}
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="text-input line-input full-width"
        placeholder="write your task"
      />
      <p className="label-text">in</p>
      <div className="inline-timer-line">
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="text-input line-input short"
          placeholder="00"
          min="1"
        />
        <span className="minutes-label">minutes</span>
        {!showButton ? (
          <span className="go-dot">.</span>
        ) : (
          <button className="go-button fade-in" onClick={handleStart}>
            GO
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
