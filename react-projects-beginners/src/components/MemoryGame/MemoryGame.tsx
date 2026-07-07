import { useState } from "react";

const data:{id:number, name:string, img:string}[] = [
  { id:1, name:'python' , img: "MemoryGameAssets/python.png", },
  { id:2, name:'python' , img: "MemoryGameAssets/python.png", },
  { id:3, name:'html' , img: "MemoryGameAssets/html.png", },
  { id:4, name:'html' , img: "MemoryGameAssets/html.png", },
  { id:5, name:'java-script' , img: "MemoryGameAssets/java-script.png", },
  { id:6, name:'java-script' , img: "MemoryGameAssets/java-script.png", },
  { id:7, name:'mysql' , img: "MemoryGameAssets/mysql.png", },
  { id:8, name:'mysql' , img: "MemoryGameAssets/mysql.png", },
  { id:9, name:'typescript' , img: "MemoryGameAssets/typescript.png", },
  { id:10, name:'typescript' , img: "MemoryGameAssets/typescript.png", },
  { id:11, name:'visual-basic' , img: "MemoryGameAssets/visual-basic.png", },
  { id:12, name:'visual-basic' , img: "MemoryGameAssets/visual-basic.png", },
];

const defaultImg:string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIsDjbrGBXKPQgofozLaunNwYBn25BCNIXxT3dCmmjLHd5V2VWkzhI9A&s=10';

const updateIcon = (id:number, val:string) => {
  let img = document.getElementById(`${id}`) as HTMLImageElement;
  if (img) {
    if (!val)
      img.src = randomizedData[map[id]].img;
    else
      img.src = defaultImg;
  }
}

let map = [0,0,0,0,0,0,0,0,0,0,0,0,0];
let randomizedData:{id:number, name:string, img:string}[] = [];

const randomizeData = () => {
  let temp:{id:number, name:string, img:string}[] = [...data];
  let count:number = 0;

  while (count < data.length) {
    let index = Math.floor(Math.random()*temp.length);
    randomizedData[count] = temp[index];
    map[temp[index].id] = count;
    temp.splice(index, 1);
    count++;
  }
}

let matchedPlates = [0,0,0,0,0,0,0,0,0,0,0,0,0];

randomizeData();

const MemoryGame = () => {
  const [firstSelection, setFirstSelection] = useState(-1);
  const [moves, setMoves] = useState(0);
  const [correctMatches, setCorrectMatches] = useState(0);

  const handleClick = (id:number, name:string) => {
    if (matchedPlates[id] > 0)
      return;

    if (firstSelection === -1)
      setFirstSelection(id);
    else {
      if (randomizedData[map[firstSelection]].id === id)
        return;
      if (randomizedData[map[firstSelection]].name === name) {
        // console.log('match');
        setCorrectMatches(correctMatches+1);
        matchedPlates[randomizedData[map[firstSelection]].id] = 1;
        matchedPlates[id] = 1;
      }
      else {
        // console.log('no match');
        updateIcon(firstSelection, defaultImg);
        updateIcon(id, defaultImg);
      }
      setFirstSelection(-1);
      setMoves(moves+1);
    }
  }

  const reset = () => {
    setFirstSelection(-1);
    setMoves(0);
    setCorrectMatches(0);
    for (let i in matchedPlates) {
      if (matchedPlates[i] > 0)
        updateIcon(parseInt(i), defaultImg);
    }
    matchedPlates = [0,0,0,0,0,0,0,0,0,0,0,0,0];
    randomizeData();
  }

  return (
    <div className="bg-blue-400 mx-auto w-fit p-5 mt-10 rounded-xl shadow-2xl">
      <h1 className="text-7xl text-white font-bold uppercase font-mono justify-self-center">Memory Game</h1>
      <div className="container grid grid-cols-4 grid-rows-3 h-full w-full justify-items-center">
        {randomizedData.map( (each) => <div key={each.id} className="w-30 h-30 rounded-full bg-white p-2 m-2 cursor-pointer flex justify-center items-center" onClick={ () => {
          if (correctMatches < 6) {
            updateIcon(each.id, '');
            setTimeout( () => {
              handleClick(each.id, each.name);
            }, 500 );
          }
          } }><img className="rounded-full w-25 h-25" src={defaultImg} alt={each.name} id={each.id+""} /></div> )}
      </div>
      <div className="bg-white rounded-full w-fit text-4xl place-self-center px-10 py-2 m-4">
        {correctMatches < 6 ? <h2>Moves: {moves}</h2> : <h2>You won in {moves} moves!</h2>}
      </div>
      <div className="place-self-end"><button className="shadow-xl cursor-pointer bg-green-400 text-white font-bold text-xl rounded-xl px-3 py-1" type="button" onClick={reset}>New Game 🗘</button></div>
    </div>
  )
}

export default MemoryGame;