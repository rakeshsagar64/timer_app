import React, { useEffect, useRef } from "react";
import "./App.css";

function Home({ startTimer, task, minutes, setTask, setMinutes }) {
  const taskRef = useRef(null);

  useEffect(() => {
    if (taskRef.current) taskRef.current.focus();
  }, []);

  const isFormFilled = task.trim() !== "" && minutes > 0;

  return (
    <div className="refined-layout">
      <p className="label-text">I would like to</p>

      <input
        type="text"
        className="text-input full-width"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        ref={taskRef}
        placeholder="Cook Maggi..."
        style={{ marginBottom: "30px" }}
      />

      <p className="label-text" style={{ marginBottom: "10px" }}>
        in
      </p>

      <div className="inline-timer-line">
        <input
          type="number"
          className="line-input short"
          value={minutes === 0 ? "" : minutes}
          onChange={(e) => setMinutes(parseInt(e.target.value, 10) || 0)}
          placeholder="02"
          min="01"
          max="60"
        />
        <p className="minutes-label">minutes</p>

        {isFormFilled ? (
          <button
            className="go-button fade-in"
            onClick={() => startTimer(task, minutes)}
          >
            Go
          </button>
        ) : (
          <span className="go-dot">.</span>
        )}
      </div>
    </div>
  );
}

export default Home;
