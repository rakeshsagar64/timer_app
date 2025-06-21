// Timer.js
import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import image from "./images/image_two.svg";

// ✨ Helper: Convert task string to a gerund phrase
function convertToGerund(task) {
  if (!task) return "";

  // Remove common leading phrases like "to", "I would like to", etc.
  let cleaned = task.trim().replace(/^.*?\bto\b\s*/i, "");

  // Capitalize first letter
  cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);

  const firstWord = cleaned.split(" ")[0];
  let gerund = firstWord;

  // Naive rules for gerund transformation
  if (firstWord.match(/ie$/)) {
    gerund = firstWord.slice(0, -2) + "ying"; // die → dying
  } else if (firstWord.match(/e$/) && !firstWord.match(/ee$/)) {
    gerund = firstWord.slice(0, -1) + "ing"; // bake → baking
  } else if (!firstWord.endsWith("ing")) {
    gerund = firstWord + "ing"; // cook → cooking
  }

  // Replace the first word with gerund
  return gerund + cleaned.slice(firstWord.length);
}

function Timer({ task, endTime, goBackAndReset }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  const gerundTask = convertToGerund(task); // ✅ Use gerund phrase

  useEffect(() => {
    const updateRemainingTime = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
      }
    };

    updateRemainingTime(); // Initial call
    intervalRef.current = setInterval(updateRemainingTime, 1000);

    return () => clearInterval(intervalRef.current);
  }, [endTime]);

  // 🔊 Play sound when timer hits 0
  useEffect(() => {
    if (timeLeft === 0 && audioRef.current) {
      audioRef.current.play().catch((e) => {
        console.warn("Audio playback failed:", e);
      });
    }
  }, [timeLeft]);

  // 🧠 Update browser tab title with countdown
  useEffect(() => {
    if (timeLeft > 0) {
      document.title = `${formatTime(timeLeft)} - ${gerundTask}`;
    } else if (timeLeft === 0) {
      document.title = `⏰ ${gerundTask} is done!`;
    } else {
      document.title = "Timer";
    }

    return () => {
      document.title = "Timer"; // Reset on unmount
    };
  }, [timeLeft, gerundTask]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="refined-layout">
      {/* 🔊 Audio */}
      <audio
        ref={audioRef}
        src={`${process.env.PUBLIC_URL}/sounds/alarm.mp3`}
        preload="auto"
      />

      {timeLeft > 0 ? (
        <>
          <p
            className="label-text"
            style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "16px" }}
          >
            <span style={{ marginRight: "6px" }}>Finish</span>
            {gerundTask}
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
              {formatTime(timeLeft)}
            </p>
          </div>
        </>
      ) : (
        <>
          <p
            className="label-text"
            style={{ fontSize: "3rem", fontWeight: 900, marginBottom: "16px" }}
          >
            {gerundTask}
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
                padding: "7px",
                marginLeft: "6px",
                fontSize: "1.8rem",
                fontWeight: 900,
                fontFamily: "Segoe UI, sans-serif",
              }}
            >
              Done
            </button>
          </div>
        </>
      )}

      <img src={image} alt="Timer illustration" style={{ width: "80%" }} />
    </div>
  );
}

export default Timer;
