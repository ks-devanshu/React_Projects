import { useEffect, useState } from "react";

let initial:number[] = [1,1,1,1,1,1,1,1,1,1];

const rollDice = (data:number[]) => {
  for ( let i in data ) {
    if (locked[i])
      continue;
    data[i] = Math.ceil(Math.random()*6);
  }
};

let locked:Boolean[] = [false,false,false,false,false,false,false,false,false,false];

const updateLockedStatus = () => {
  for (let i in locked) {
    if (locked[i]) {
      document.getElementById(`div-flex${i}`)?.classList.remove('bg-red-500');
      locked[i] = !locked[i];
    }
  }
}

let tmId = 0;

const TenziesGame = () => {

  const [output, setOutput] = useState(initial);
  const [perfect, setPerfect] = useState(0);
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect( () => {
    if (isStarted && perfect < 1) {
      tmId = setTimeout( () => {
        setTime(time+1);
      }, 1000 );
    }
  }, [time, isStarted] )

  const perform = () => {
    let temp = [...output];
    rollDice(temp);
    setOutput(temp);
    
    if ( temp.every( (value) => value === temp[0] ) ) {
      setPerfect(1);
      setTimeout( () => {
        setIsStarted(false);
        updateLockedStatus();
      }, 2000 );
    }
  }

  const start = () => {
    setIsStarted(true);
    setTime(0);
    setPerfect(0);
    setRolls(0);
    clearTimeout(tmId);

    perform();
  };

  const handleRoll = () => {
    if (isStarted) {
      perform();
      setRolls(rolls+1);
    }
  }

  const handleLock = (index:number) => {
    locked[index] = !locked[index];
    document.getElementById(`div-flex${index}`)?.classList.toggle('bg-red-500');
  }

  return (
    <div className="bg-blue-300 rounded-xl w-170 mx-auto mt-2 shadow-2xl flex flex-col p-5 items-center">
      <h1 className="text-6xl text-white uppercase font-bold m-3 font-mono">Tenzies Game</h1>
      <button className="bg-green-400 rounded-xl w-fit h-10 text-white font-bold p-2 m-5 cursor-pointer shadow-xl" popoverTarget="instruction" >▶ Show Instructions</button>
      <div id="instruction" popover="manual" className="modal">
        <div className="modal-box">
          <h3 className="text-2xl font-bold my-5">Instructions</h3>
          <h4>Step 1: Click on dice to freeze or unfreeze it.</h4>
          <h4>Step 2: Click on "Start Game" to begin.</h4>
          <h4>Step 3: Roll the dice to match a winning combination.</h4>
          <h4>Step 4: The timer will start when game begins.</h4>
          <h4>Step 5: Win the game by matching all dice to same number.</h4>
          <button className="bg-teal-400 rounded-xl w-fit p-2 text-white mt-4 font-bold cursor-pointer" popoverTarget="instruction" popoverTargetAction="hide">Close</button>
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {output.map( (each, index) => <div key={index} className="bg-blue-800 w-20 h-20 text-white rounded-full m-2 flex justify-center items-center cursor-pointer shadow-xl" onClick={() => handleLock(index)} id={"div-flex"+index}><p className="text-3xl font-bold w-fit">{each}</p></div> )}
      </div>
      <button className="bg-green-400 rounded-xl w-30 h-10 text-white font-bold p-2 m-5 cursor-pointer shadow-xl" onClick={handleRoll} >🎲 Roll Dice</button>
      <h2 className="text-white font-bold text-xl">🗘 Rolls  : <span className="text-red-400 text-3xl">{rolls}</span></h2>
      <h2 className="text-gray-600 font-bold text-xl">⏰ Time elapsed : <span className="text-green-600 text-3xl">{time}s</span></h2>
      <button className="bg-green-400 rounded-xl w-fit h-10 text-white font-bold p-2 px-5 m-5 cursor-pointer shadow-xl" onClick={start} >▷ Start Game</button>
      {perfect > 0 && <p className="text-3xl text-green-800 font-bold">You have won! Congratulations.</p>}
    </div>
  )
}

export default TenziesGame;