
type LeitnerSimulatorProps = {
    easyMultiplier: number;
    goodMultiplier: number;
    hardMultiplier: number;
    againMultiplier: number;
    maxIntervalMultiplier ?: number;
    onEasyMultiplierChange: (inp: number) => void;
    onGoodMultiplierChange: (inp: number) => void;
    onHardMultiplierChange: (inp: number) => void;
    onAgainMultiplierChange: (inp: number) => void;
  };

function LeitnerSimulator({
    easyMultiplier,
    goodMultiplier,
    hardMultiplier,
    againMultiplier,
    maxIntervalMultiplier,
    onEasyMultiplierChange,
    onGoodMultiplierChange,
    onHardMultiplierChange,
    onAgainMultiplierChange,
} : LeitnerSimulatorProps) {

    return (
        <div>
       <h1>Review Settings</h1>
       <div>
        <input type="number" value={againMultiplier} onChange={e => onAgainMultiplierChange(Number(e.target.value))} />
        <input type="number" value={goodMultiplier} onChange={e => onGoodMultiplierChange(Number(e.target.value))} />
        <input type="number" value={hardMultiplier} onChange={e => onHardMultiplierChange(Number(e.target.value))} />
        <input type="number" value={easyMultiplier} onChange={e => onEasyMultiplierChange(Number(e.target.value))} />
        <input type="number" value={ maxIntervalMultiplier} onChange={e => (Number(e.target.value))} />
      </div>
    </div>
    );
}

export default LeitnerSimulator;


