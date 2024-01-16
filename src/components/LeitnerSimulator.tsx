import React, { useState } from 'react';
import './LeitnerSimulator.css'; 

type Step = {
  interval: number;
  action: 'easy' | 'good' | 'hard' | 'again';
};

function LeitnerSimulator() {
  const [currentInterval, setCurrentInterval] = useState(1);
  const [steps, setSteps] = useState<Step[]>([]);
  
  const [easyMultiplier, setEasyMultiplier] = useState(4.0); 
  const [goodMultiplier, setGoodMultiplier] = useState(1.8);
  const [hardMultiplier, setHardMultiplier] = useState(1.2);
  const [againMultiplier, setAgainMultiplier] = useState(0.5);

  const handleAction = (action: 'easy' | 'good' | 'hard' | 'again') => {
    let newInterval;
    const multiplier = {
      easy: easyMultiplier,
      good: goodMultiplier,
      hard: hardMultiplier,
      again: againMultiplier,
    }[action];
  
    if (steps.length === 0) {
      newInterval = multiplier; 
    } else {
      newInterval = currentInterval * multiplier;
    }
  
    setCurrentInterval(newInterval);
    setSteps([...steps, { interval: newInterval, action }]);
  
    
    setTimeout(() => {
      const stepsContainer = document.querySelector('.steps');
      if (stepsContainer) {
        stepsContainer.scrollLeft = stepsContainer.scrollWidth;
      }
    }, 100);
  };
  
  
  const handleReset = () => {
    setCurrentInterval(1);
    setSteps([]);
  };
  

  return (
    <div className="backdrop">
    <div className="leitner-simulator">
      <h1>Leitner System Simulator</h1>
      <p>
        In this section, you have the ability to modify the parameters that
        determine the timing and manner of card reviews. These general settings
        apply to all cards, though they can be individually adjusted for
        specific decks or notes within the review settings.
      </p>

      <div className="multipliers">
        <label>
          Easy Multiplier:
          <input
            type="number"
            value={easyMultiplier}
            onChange={(e) => setEasyMultiplier(Number(e.target.value))}
          />
        </label>
        <label>
          Good Multiplier:
          <input
            type="number"
            value={goodMultiplier}
            onChange={(e) => setGoodMultiplier(Number(e.target.value))}
          />
        </label>
        <label>
          Hard Multiplier:
          <input
            type="number"
            value={hardMultiplier}
            onChange={(e) => setHardMultiplier(Number(e.target.value))}
          />
        </label>
        <label>
          Again Multiplier:
          <input
            type="number"
            value={againMultiplier}
            onChange={(e) => setAgainMultiplier(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="steps-container">
        <div className="steps">
          {steps.length === 0 && (
            <div className="step">
              <div className="box">+</div>
              <div className="arrow">&#8594;</div>
              <div className="box"></div>
            </div>
          )}
          {steps.map((step, index) => (
            <div key={index} className="step">
              <div className="box">{index === 0 ? '+' : '✓'}</div>
              <div className="arrow">
                <span className="interval">{step.interval} days</span>
                &#8594;
              </div>
              <div className="box"></div>
            </div>
          ))}
        </div>
        <div className="action-buttons">
        <button onClick={() => handleAction("easy")}>Easy</button>
        <button onClick={() => handleAction("good")}>Good</button>
        <button onClick={() => handleAction("hard")}>Hard</button>
        <button onClick={() => handleAction("again")}>Again</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      </div>
    </div>
    </div>
  );
}

export default LeitnerSimulator;

