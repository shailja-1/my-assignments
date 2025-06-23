import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [cyclesBeforeLongBreak, setCyclesBeforeLongBreak] = useState(4);

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Work"); // Work, Short Break, Long Break
  const [timeLeft, setTimeLeft] = useState(workDuration * 60);
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeLeft(workDuration * 60);
  }, [workDuration]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      handleAutoSwitch();
    }
  }, [timeLeft, isRunning]);

  const handleAutoSwitch = () => {
    clearInterval(intervalRef.current);
    if (mode === "Work") {
      const newCount = cycleCount + 1;
      setCycleCount(newCount);
      if (newCount % cyclesBeforeLongBreak === 0) {
        setMode("Long Break");
        setTimeLeft(longBreak * 60);
      } else {
        setMode("Short Break");
        setTimeLeft(shortBreak * 60);
      }
    } else {
      setMode("Work");
      setTimeLeft(workDuration * 60);
    }
    setIsRunning(true);
    startTimer(); // restart timer
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  const handleStart = () => {
    setIsRunning(true);
    startTimer();
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setCycleCount(0);
    setMode("Work");
    setTimeLeft(workDuration * 60);
  };

  return (
    <div className="App">
      <h1>🍅 Pomodoro Timer</h1>

      <div className="settings">
        <label>
          Work (min):
          <input
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(Number(e.target.value))}
          />
        </label>
        <label>
          Short Break:
          <input
            type="number"
            value={shortBreak}
            onChange={(e) => setShortBreak(Number(e.target.value))}
          />
        </label>
        <label>
          Long Break:
          <input
            type="number"
            value={longBreak}
            onChange={(e) => setLongBreak(Number(e.target.value))}
          />
        </label>
        <label>
          Pomodoros Before Long Break:
          <input
            type="number"
            value={cyclesBeforeLongBreak}
            onChange={(e) => setCyclesBeforeLongBreak(Number(e.target.value))}
          />
        </label>
      </div>

      <h2>{mode}</h2>
      <div className="timer">{formatTime(timeLeft)}</div>

      <div className="controls">
        {isRunning ? (
          <button onClick={handlePause}>Pause ⏸</button>
        ) : (
          <button onClick={handleStart}>Start ▶️</button>
        )}
        <button onClick={handleReset}>Reset 🔁</button>
      </div>

      <div className="indicators">
        {Array.from({ length: cyclesBeforeLongBreak }, (_, i) => (
          <span key={i}>{i < cycleCount % cyclesBeforeLongBreak ? "🔴" : "⚪"}</span>
        ))}
      </div>
    </div>
  );
}

export default App;
