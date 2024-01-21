import React, { useState } from "react";
import Styles from "./LeitnerSimulator.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

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
  onMaxIntervalMultiplierChange?: (value: number) => void;
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
  onMaxIntervalMultiplierChange,
}: LeitnerSimulatorProps) {
  const [currentIntervalDays, setCurrentIntervalDays] = useState(1);
  const [reviewStepsHistory, setReviewStepsHistory] = useState<Step[]>([]);

  const [easyMultiplier, setEasyMultiplier] = useState(4.0);
  const [goodMultiplier, setGoodMultiplier] = useState(1.8);
  const [hardMultiplier, setHardMultiplier] = useState(1.2);
  const [againMultiplier, setAgainMultiplier] = useState(0.5);
  const [maxIntervalMultiplier, setMaxIntervalMultiplier] = useState(365);
  const [isMaxIntervalReached, setIsMaxIntervalReached] = useState(false);

  const handleReviewAction = (action: "easy" | "good" | "hard" | "again") => {
    if (isMaxIntervalReached) return;

    const multiplier = {
      easy: easyMultiplier,
      good: goodMultiplier,
      hard: hardMultiplier,
      again: againMultiplier,
    }[action];

    let newInterval = currentIntervalDays * multiplier;
    if (reviewStepsHistory.length === 0) {
      newInterval = multiplier;
    }

    if (newInterval >= maxIntervalMultiplier) {
      newInterval = maxIntervalMultiplier;
      setIsMaxIntervalReached(true);
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
    setIsMaxIntervalReached(false);
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

  const updateMaxIntervalMultiplier = (value: string) => {
    const numericValue = value === "" ? 0 : Number(value);
    setMaxIntervalMultiplier(numericValue);
    onMaxIntervalMultiplierChange?.(numericValue);
  };

  return (
    <div className={Styles.backdropContainer}>
      <div className={Styles.leitnerSimulator}>
        <h1>Leitner System Simulator</h1>
        <p>
          In this section, you have the ability to modify the parameters that
          determine the timing and manner of card reviews. These general
          settings apply to all cards, though they can be individually adjusted
          for specific decks or notes within the review settings.
        </p>

        <div className={Styles.intervalMultipliers}>
          <label>
            Easy Multiplier:
            <div className={Styles.inputContainer}>
              <input
                type="number"
                value={easyMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("easy", e.target.value)
                }
              />

              <span className={Styles.inputSymbol}>x</span>
            </div>
          </label>

          <label>
            Good Multiplier:
            <div className={Styles.inputContainer}>
              <input
                type="number"
                value={goodMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("good", e.target.value)
                }
              />
              <span className={Styles.inputSymbol}>x</span>
            </div>
          </label>

          <label>
            Hard Multiplier:
            <div className={Styles.inputContainer}>
              <input
                type="number"
                value={hardMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("hard", e.target.value)
                }
              />
              <span className={Styles.inputSymbol}>x</span>
            </div>
          </label>

          <label>
            Again Multiplier:
            <div className={Styles.inputContainer}>
              <input
                type="number"
                value={againMultiplier || ""}
                onChange={(e) =>
                  updateIntervalMultiplier("again", e.target.value)
                }
              />
              <span className={Styles.inputSymbol}>x</span>
            </div>
          </label>
          <label>
            Max Interval:
            <div
              className={`${Styles.inputContainer} ${Styles.maxIntervalInputContainer}`}
            >
              <input
                type="number"
                value={maxIntervalMultiplier || ""}
                onChange={(e) => updateMaxIntervalMultiplier(e.target.value)}
              />
            </div>
          </label>
        </div>

        <div className={Styles.stepsContainer}>
          <div className={Styles.reviewSteps}>
            <div className={Styles.step}>
              <div className={Styles.leitnerBox}>+</div>
              <div className={Styles.leitnerArrow}>&#8594;</div>
            </div>

            {reviewStepsHistory.map((step, index) => (
              <React.Fragment key={index}>
                <div className={Styles.leitnerBox}>{step.action}</div>
                <div className={Styles.intervalLabel}>{step.interval} days</div>
                <div className={Styles.leitnerArrow}>&#8594;</div>
                {index < reviewStepsHistory.length - 1 && (
                  <div className={Styles.intervalConnector}></div>
                )}
              </React.Fragment>
            ))}

            {isMaxIntervalReached && (
              <div className={Styles.leitnerBox}>
                <FontAwesomeIcon
                  icon={faMoon}
                  className={Styles.halfMoonIcon}
                />
              </div>
            )}

            {!isMaxIntervalReached && reviewStepsHistory.length > 0 && (
              <div className={`${Styles.leitnerBox} ${Styles.emptyBox}`}></div>
            )}
          </div>
          <div className={Styles.actionButtons}>
            <button
              onClick={() => handleReviewAction("easy")}
              disabled={isMaxIntervalReached}
            >
              {easyLabel}
            </button>
            <button
              onClick={() => handleReviewAction("good")}
              disabled={isMaxIntervalReached}
            >
              {goodLabel}
            </button>
            <button
              onClick={() => handleReviewAction("hard")}
              disabled={isMaxIntervalReached}
            >
              {hardLabel}
            </button>
            <button
              onClick={() => handleReviewAction("again")}
              disabled={isMaxIntervalReached}
            >
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
