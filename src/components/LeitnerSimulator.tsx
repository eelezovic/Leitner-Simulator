import React, { useState } from "react";
import "./LeitnerSimulator.css";

type Step = {
  interval: number;
  action: "easy" | "good" | "hard" | "again";
};

type LeitnerSimulatorProps = {
  easyLabel?: string;
  goodLabel?: string;
  hardLabel?: string;
  againLabel?: string;
  onEasyMultiplierChange?: (value: number) => void;
  onGoodMultiplierChange?: (value: number) => void;
  onHardMultiplierChange?: (value: number) => void;
  onAgainMultiplierChange?: (value: number) => void;
};

function LeitnerSimulator({
  easyLabel = "Easy",
  goodLabel = "Good",
  hardLabel = "Hard",
  againLabel = "Again",
  onEasyMultiplierChange,
  onGoodMultiplierChange,
  onHardMultiplierChange,
  onAgainMultiplierChange,
}: LeitnerSimulatorProps) {
  const [currentIntervalDays, setCurrentIntervalDays] = useState(1);
  const [reviewStepsHistory, setReviewStepsHistory] = useState<Step[]>([]);

  const [easyMultiplier, setEasyMultiplier] = useState(4.0);
  const [goodMultiplier, setGoodMultiplier] = useState(1.8);
  const [hardMultiplier, setHardMultiplier] = useState(1.2);
  const [againMultiplier, setAgainMultiplier] = useState(0.5);

  const handleReviewAction = (action: "easy" | "good" | "hard" | "again") => {
    let newInterval;
    const multiplier = {
      easy: easyMultiplier,
      good: goodMultiplier,
      hard: hardMultiplier,
      again: againMultiplier,
    }[action];

    if (reviewStepsHistory.length === 0) {
      newInterval = multiplier;
    } else {
      newInterval = currentIntervalDays * multiplier;
    }

    setCurrentIntervalDays(newInterval);
    setReviewStepsHistory([
      ...reviewStepsHistory,
      { interval: newInterval, action },
    ]);

    setTimeout(() => {
      const stepsContainer = document.querySelector(".steps");
      if (stepsContainer) {
        stepsContainer.scrollLeft = stepsContainer.scrollWidth;
      }
    }, 100);
  };

  const resetReviewHistory = () => {
    setCurrentIntervalDays(1);
    setReviewStepsHistory([]);
  };

  const updateIntervalMultiplier = (
    action: "easy" | "good" | "hard" | "again",
    value: string
  ) => {
    const numericValue = value === "" ? 0 : Number(value);

    const setMultiplierHandlers = {
      easy: setEasyMultiplier,
      good: setGoodMultiplier,
      hard: setHardMultiplier,
      again: setAgainMultiplier,
    };
    setMultiplierHandlers[action](numericValue);

    const callbackHandlers = {
      easy: onEasyMultiplierChange,
      good: onGoodMultiplierChange,
      hard: onHardMultiplierChange,
      again: onAgainMultiplierChange,
    };
    callbackHandlers[action]?.(numericValue);
  };

  return (
    <div className="backdropContainer">
      <div className="leitnerSimulator">
        <h1>Leitner System Simulator</h1>
        <p>
          In this section, you have the ability to modify the parameters that
          determine the timing and manner of card reviews. These general
          settings apply to all cards, though they can be individually adjusted
          for specific decks or notes within the review settings.
        </p>

        <div className="intervalMultipliers">
          <label>
            Easy Multiplier:
            <div className="inputContainer">
              <input
                type="number"
                value={easyMultiplier || ""} // ..here I'm displaying an empty string if the value is 0
                onChange={(e) =>
                  updateIntervalMultiplier("easy", e.target.value)
                }
              />

              <span className="inputSymbol">x</span>
            </div>
          </label>

          <label>
            Good Multiplier:
            <div className="inputContainer">
              <input
                type="number"
                value={goodMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("good", e.target.value)
                }
              />
              <span className="inputSymbol">x</span>
            </div>
          </label>

          <label>
            Hard Multiplier:
            <div className="inputContainer">
              <input
                type="number"
                value={hardMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("hard", e.target.value)
                }
              />
              <span className="inputSymbol">x</span>
            </div>
          </label>

          <label>
            Again Multiplier:
            <div className="inputContainer">
              <input
                type="number"
                value={againMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("again", e.target.value)
                }
              />
              <span className="inputSymbol">x</span>
            </div>
          </label>
        </div>

        <div className="stepsContainer">
          <div className="reviewSteps">
 
            <div className="step">
              <div className="leitnerBox">+</div>
              <div className="leitnerArrow">&#8594;</div>
            </div>

            {reviewStepsHistory.map((step, index) => (
              <React.Fragment key={index}>
                <div className="leitnerBox">{step.action}</div>
                <div className="intervalLabel">{step.interval} days</div>
                <div className="leitnerArrow">&#8594;</div>
                {index < reviewStepsHistory.length - 1 && (
                  <div className="intervalConnector"></div>
                )}
              </React.Fragment>
            ))}

            {reviewStepsHistory.length > 0 && (
              <div className="leitnerBox emptyBox"></div>
            )}
          </div>
          <div className="actionButtons">
            <button onClick={() => handleReviewAction("easy")}>
              {easyLabel}
            </button>
            <button onClick={() => handleReviewAction("good")}>
              {goodLabel}
            </button>
            <button onClick={() => handleReviewAction("hard")}>
              {hardLabel}
            </button>
            <button onClick={() => handleReviewAction("again")}>
              {againLabel}
            </button>
            <button onClick={resetReviewHistory}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeitnerSimulator;
