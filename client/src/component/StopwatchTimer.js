import React, { useState, useEffect } from "react";
import "./StopwatchTimer.css";

const StopwatchTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState("stopwatch"); // "stopwatch" or "timer"
  const [editing, setEditing] = useState(null); // Track which segment is being edited
  const [editingValue, setEditingValue] = useState(""); // Temporary value for editing

  useEffect(() => {
    let timer;
    if (started) {
      timer = setInterval(() => {
        if (mode === "stopwatch") {
          setSeconds((prevSeconds) => prevSeconds + 1);
        } else if (mode === "timer") {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [started, mode]);

  useEffect(() => {
    if (mode === "stopwatch" && seconds === 60) {
      setMinutes((prevMinutes) => prevMinutes + 1);
      setSeconds(0);
    }
    if (mode === "stopwatch" && minutes === 60) {
      setHours((prevHours) => prevHours + 1);
      setMinutes(0);
    }

    if (mode === "timer" && seconds < 0) {
      if (minutes > 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((prevHours) => prevHours - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        setStarted(false);
        alert("Time's up!");
      }
    }
  }, [seconds, minutes, hours, mode]);

  const start = () => {
    if (mode === "timer" && !hours && !minutes && !seconds) {
      alert("Please set the timer duration first.");
    } else {
      setStarted(true);
      setEditing(null);
    }
  };

  const halt = () => {
    setStarted(false);
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setStarted(false);
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "stopwatch" ? "timer" : "stopwatch"));
    reset();
  };

  const handleEdit = (unit) => {
    if (!started) {  // Only allow editing if timer is not started
      setEditing(unit);
      if (unit === "hours") setEditingValue(hours);
      if (unit === "minutes") setEditingValue(minutes);
      if (unit === "seconds") setEditingValue(seconds);
    }
  };

  const handleTimeInput = (e) => {
    const value = e.target.value.replace(/\D/, ""); // Only allow numeric input
    setEditingValue(value);
  };

  const handleTimeBlur = () => {
    const value = Math.max(0, parseInt(editingValue) || 0);
    if (editing === "hours") setHours(Math.min(value, 99));
    if (editing === "minutes") setMinutes(Math.min(value, 59));
    if (editing === "seconds") setSeconds(Math.min(value, 59));
    setEditing(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTimeBlur();
    }
  };

  return (
    <div className="stopwatch-timer">
      <div className="stopwatch-timer-container">
        <h1>{mode === "stopwatch" ? "Stopwatch" : "Timer"}</h1>
        <div className="time-display">
          {editing === "hours" ? (
            <input
              type="number"
              className="time-input"
              value={editingValue}
              onChange={handleTimeInput}
              onBlur={handleTimeBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span className="time" onClick={() => handleEdit("hours")}>
              {hours < 10 ? "0" + hours : hours}
            </span>
          )}
          :
          {editing === "minutes" ? (
            <input
              type="number"
              className="time-input"
              value={editingValue}
              onChange={handleTimeInput}
              onBlur={handleTimeBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span className="time" onClick={() => handleEdit("minutes")}>
              {minutes < 10 ? "0" + minutes : minutes}
            </span>
          )}
          :
          {editing === "seconds" ? (
            <input
              type="number"
              className="time-input"
              value={editingValue}
              onChange={handleTimeInput}
              onBlur={handleTimeBlur}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <span className="time" onClick={() => handleEdit("seconds")}>
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
          )}
        </div>
        <div className="buttons">
          <button className="toggle-mode" onClick={toggleMode}>
            {mode === "stopwatch" ? "Timer" : "Stopwatch"}
          </button>
          <button className="start" onClick={start}>Start</button>
          <button className="halt" onClick={halt}>Stop</button>
          <button className="reset" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default StopwatchTimer;