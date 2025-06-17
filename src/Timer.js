import React, { useEffect, useState } from "react";
import "./App.css";

function Timer({ task, minutes, goBack }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="refined-layout">
      <p className="label-text">You're doing:</p>
      <p className="label-text">{task}</p>

      <p className="label-text" style={{ fontSize: "4rem", marginTop: "30px" }}>
        {formatTime(timeLeft)}
      </p>

      <button
        className="start-button rectangular"
        onClick={goBack}
        style={{ marginTop: "40px" }}
      >
        Back
      </button>
    </div>
  );
}

export default Timer;
