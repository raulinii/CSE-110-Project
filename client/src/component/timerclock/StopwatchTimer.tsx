import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList"; // Import the ToDoList component
import "./StopwatchTimer.css";
import ToggleMusicButton from "../toggleMusic/ToggleMusicButton"; 


const StopwatchTimer: React.FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState("stopwatch");
  const [editingField, setEditingField] = useState<"hours" | "minutes" | "seconds" | null>(null);
  const [editingTodo, setEditingTodo] = useState(false);
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>([]);
  //const [editingTodo, setEditingTodo] = useState(false);

  useEffect(() => {
    if (!started) return;

    const timer = setInterval(() => {
      if (mode === "stopwatch") {
        setSeconds((prev) => prev + 1);
      } else if (mode === "timer") {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [started, mode]);

  useEffect(() => {
    if (seconds >= 60 && mode === "stopwatch") {
      setMinutes((prev) => prev + 1);
      setSeconds(0);
    }
    if (minutes >= 60 && mode === "stopwatch") {
      setHours((prev) => prev + 1);
      setMinutes(0);
    }

    if (seconds < 0 && mode === "timer") {
      if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((prev) => prev - 1);
        setMinutes(59);
        setSeconds(59);
      } else {
        setStarted(false);
        alert("Time's up!");
      }
    }
  }, [seconds, minutes, hours, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "stopwatch" ? "timer" : "stopwatch"));
    reset();
  };

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setStarted(false);
  };

  const handleFieldClick = (field: "hours" | "minutes" | "seconds") => {
    setEditingField(field);
  };

  const handleFieldChange = (value: string, field: "hours" | "minutes" | "seconds") => {
    const numValue = Math.max(0, Number(value)); // Ensure non-negative numbers
    if (field === "hours") setHours(Math.min(99, numValue));
    else if (field === "minutes") setMinutes(Math.min(59, numValue));
    else if (field === "seconds") setSeconds(Math.min(59, numValue));
  };

  const updateTasks = (newTasks: { text: string; completed: boolean }[]) => {
    setTasks(newTasks);
  };

  return (
    <div className="stopwatch-timer">
      <div className="button-container">
        <button className="todo" onClick={() => setEditingTodo(true)}>
          To-Do List
        </button>
      </div>

      {editingTodo && (
        <ToDoList
          isOpen={editingTodo}
          onClose={() => setEditingTodo(false)}
          tasks={tasks} 
          updateTasks={updateTasks} 
        />
      )}

      <ToggleMusicButton />
      <div className="stopwatch-timer-container">
        <div className="time-display">
          {editingField === "hours" ? (
            <input
              className="time-input"
              type="number"
              value={hours}
              min="0"
              max="99"
              onBlur={() => setEditingField(null)} // Exit edit mode on blur
              onChange={(e) => handleFieldChange(e.target.value, "hours")}
              autoFocus
            />
          ) : (
            <span className="time" onClick={() => handleFieldClick("hours")}>
              {String(hours).padStart(2, "0")}
            </span>
          )}
          :
          {editingField === "minutes" ? (
            <input
              className="time-input"
              type="number"
              value={minutes}
              min="0"
              max="59"
              onBlur={() => setEditingField(null)}
              onChange={(e) => handleFieldChange(e.target.value, "minutes")}
              autoFocus
            />
          ) : (
            <span className="time" onClick={() => handleFieldClick("minutes")}>
              {String(minutes).padStart(2, "0")}
            </span>
          )}
          :
          {editingField === "seconds" ? (
            <input
              className="time-input"
              type="number"
              value={seconds}
              min="0"
              max="59"
              onBlur={() => setEditingField(null)}
              onChange={(e) => handleFieldChange(e.target.value, "seconds")}
              autoFocus
            />
          ) : (
            <span className="time" onClick={() => handleFieldClick("seconds")}>
              {String(seconds).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="buttons">
          <button className="timer-btn" onClick={toggleMode}>
            {mode === "stopwatch" ? "Timer" : "Stopwatch"}
          </button>
          <button className="stopwatch-btn" onClick={() => setStarted(true)}>Start</button>
          <button className="stopwatch-btn" onClick={() => setStarted(false)}>Stop</button>
          <button className="reset-slot-btn" onClick={reset}>Reset</button>
      </div>
      </div>
    </div>
  );
};

export default StopwatchTimer;