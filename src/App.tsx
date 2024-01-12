import { useState } from 'react';
import LeitnerSimulator from "./components/LeitnerSimulator";

function App() {

  const [easyMultiplier, setEasyMultiplier] = useState(4.0); 
  const [goodMultiplier, setGoodMultiplier] = useState(1.8);
  const [hardMultiplier, setHardMultiplier] = useState(1.2);
  const [againMultiplier, setAgainMultiplier] = useState(0.5);


  return (
    <>
     <LeitnerSimulator
        easyMultiplier={easyMultiplier}
        goodMultiplier={goodMultiplier}
        hardMultiplier={hardMultiplier}
        againMultiplier={againMultiplier}

        onEasyMultiplierChange={setEasyMultiplier}
        onGoodMultiplierChange={setGoodMultiplier}
        onHardMultiplierChange={setHardMultiplier}
        onAgainMultiplierChange={setAgainMultiplier}
      />
    </>
  );
}

export default App;
