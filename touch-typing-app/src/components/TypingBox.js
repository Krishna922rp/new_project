import React, { useState, useEffect } from 'react';
import './TypingBox.css';

const TypingBox = () => {
  const [userInput, setUserInput] = useState('');
  const [nextKeys, setNextKeys] = useState('');
  const [timer, setTimer] = useState(300);
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const calculateStatistics = () => {
    const typedKeys = userInput.replace(/[^a-z]/gi, '');
    const correctKeys = nextKeys.slice(0, typedKeys.length);
    const keysCount = typedKeys.length;
    const correctCount = typedKeys.split('').reduce((count, key, index) => {
      if (key === correctKeys[index]) {
        return count + 1;
      }
      return count;
    }, 0);

    const accuracyPercentage = (correctCount / keysCount) * 100;

    setKeysPressed(keysCount);
    setAccuracy(accuracyPercentage.toFixed(2));
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countdown);
      calculateStatistics();
    }

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    const keys = 'asdfjkl;';
    let next = '';
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      next += keys[randomIndex];
    }
    setNextKeys(next);
  }, []);

  return (
    <div className="typing-box-container">
      <div className="typing-box">
        <div>Next keys: {nextKeys}</div>
        <input type="text" value={userInput} onChange={handleInputChange} />
      </div>
      <div className="statistics">
        <div className="timer">Timer: {timer} seconds</div>
        <div className="stat-item">Keys Pressed: {keysPressed}</div>
        <div className="stat-item">Accuracy: {accuracy}%</div>
      </div>
    </div>
  );
};

export default TypingBox;
