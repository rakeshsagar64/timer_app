import React, { useEffect, useState, useRef } from "react";
import "./App.css";

function Timer({ task, minutes, goBackAndReset }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    if (minutes > 0) {
      setTimeLeft(minutes * 60);
    }
  }, [minutes]);

  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  // 🔊 Play sound when time hits 0
  useEffect(() => {
    if (timeLeft === 0 && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn("Audio playback failed:", e);
      });
    }
  }, [timeLeft]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="refined-layout">
      {/* 🔊 Audio element */}
      <audio ref={audioRef} src="/sounds/alarm.mp3" preload="auto" />

      {timeLeft > 0 ? (
        <>
          <p
            className="label-text"
            style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "16px" }}
          >
            <span style={{ marginRight: "6px" }}>Finish,</span>
            {task}
          </p>

          <div className="inline-timer-line" style={{ marginBottom: "16px" }}>
            <p
              className="label-text"
              style={{ fontSize: "2rem", fontWeight: 900 }}
            >
              in
            </p>
            <p
              className="label-text timer-display"
              style={{
                fontSize: "2rem",
                fontWeight: 900,
                marginLeft: "12px",
                color: "#e65100",
              }}
            >
              {timeLeft !== null ? formatTime(timeLeft) : "--:--"}
            </p>
          </div>
        </>
      ) : (
        <>
          <p
            className="label-text"
            style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "16px" }}
          >
            {task}
          </p>

          <div className="inline-timer-line" style={{ marginBottom: "16px" }}>
            <p
              className="label-text"
              style={{ fontSize: "2rem", fontWeight: 900 }}
            >
              is
            </p>
            <button
              className="start-button rectangular"
              onClick={goBackAndReset}
              style={{
                marginLeft: "12px",
                fontSize: "2rem",
                fontWeight: 900,
                fontFamily: "Segoe UI, sans-serif",
              }}
            >
              DONE
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Timer;
