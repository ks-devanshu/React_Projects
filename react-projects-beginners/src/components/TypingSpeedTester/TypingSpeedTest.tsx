import { useEffect, useRef, useState } from 'react';
import './TypingSpeedTest.css'

const paragraphs:string[] = [
  "The sun came up early today. The sky was bright blue and there were no clouds in sight. A small bird sat on the green tree branch and started to sing a happy song. Down below, a dog ran across the yard to catch a red ball. The grass was wet with the morning dew, but the dog did not mind at all. It picked up the ball and ran back to its owner with a wagging tail. Everyone felt happy because the warm summer weather was finally here after a long and very cold winter season.",

  "Walking down the street, you could smell the fresh bread from the bakery on the corner. The baker was already hard at work making cakes and cookies for the neighborhood children. A line of people stood outside the door waiting for the shop to open up. They talked softly and smiled at each other in the morning light. Two cats sat on a stone wall nearby, watching the people pass by. It was a normal morning in the small town, but everything felt calm and peaceful for some reason",

  "Later in the day, the park was full of life and loud noises. Children ran around the big playground while their parents sat on wooden benches to watch them play. Some people brought big blankets and sat on the soft grass to eat their lunch together. A man was selling sweet ice cream from a small white cart, and many kids stood in a line to buy a cold treat. The wind blew gently through the tall trees, making the green leaves dance in the air. It was the perfect place to spend a free afternoon.",

  "By the time evening arrived, the bright sky turned into a beautiful mix of orange and pink. The street lamps turned on one by one, casting a soft yellow glow on the sidewalks. People started walking back to their homes to cook dinner and rest after a busy day. You could hear the sound of television sets and laughter coming from the open windows of the houses. The air became a little cooler, and the stars began to show up in the dark sky above the quiet town",

  "When night fell completely, everything became very still and quiet. The moon was big and round, shining like a bright light over the empty streets. Most of the people were now fast asleep in their warm beds, dreaming about the next day. Only a few cars drove by from time to time, their headlights cutting through the dark night. It was time for the world to rest and get ready for a brand new morning that would bring new things to d"

];
let paraIndex:number = Math.floor(Math.random() * paragraphs.length);
let wordCount:number = 0;
let charCount:number = 0;

let timeOutId:number;

const TypingSpeedTest = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [visibleHolder, setVisibleHolder] = useState(0);
  const [time, setTime] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState<number>(0);
  const [cpm, setCpm] = useState<number>(0);

  const handleInput = () => {
    if (inputRef.current) {
      let val = inputRef.current.value;
      if (val !== paragraphs[paraIndex].charAt(visibleHolder))
        setMistakes(mistakes+1);
      setVisibleHolder(visibleHolder+1);
      if (val === ' ' || val === '.' || val === ',')
        wordCount++;
      charCount++;
    }
  }

  const reset = () => {
    clearTimeout(timeOutId);
    setTime(60);
    setMistakes(0);
    setWpm(0);
    setCpm(0);
    setVisibleHolder(0);
    wordCount = 0;
    charCount = 0;
    paraIndex = Math.floor(Math.random() * paragraphs.length);
    if(inputRef.current)
      inputRef.current.value = '';
    document.getElementById('input-text')?.focus();
  }

  const disabledKeys:String[] = ['Backspace', 'Delete', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home','PageDown', 'PageUp'];

  useEffect( () => {
    let inputEl:HTMLElement|null = document.getElementById('input-text');
    inputEl?.addEventListener("keydown" , (event) => {
      if (disabledKeys.includes(event.key)) 
        event.preventDefault();
    });
    if (charCount){
      timeOutId = setTimeout( () => {
        if (time > 0) {
          setTime(time - 1);
          setWpm(Math.floor(wordCount * 60 / (60-time || 1)));
          setCpm(Math.floor(charCount * 60 / (60-time || 1)));
        }
      }, 1000 );
    }
    inputEl?.focus();
  }, [time, charCount] )


  return (
    <>
      <h1 className='font-bold text-6xl place-self-center my-20 uppercase text-blue-500 text-shadow-lg'>Typing Speed Tester</h1>
      <div className='flex flex-col w-200 border rounded-xl p-10 place-self-center text-xl shadow-2xl'>
        {!time && <h2 className='text-3xl text-red-500 font-bold place-self-center'>Time Over!</h2>}
        <div className={'relative '+(time ? '': 'hidden')}>
          <input disabled={time === 0} className='font-mono text-4xl focus-visible:outline-none text-transparent caret-blue-800/40 absolute' autoFocus onChange={() => {
            handleInput();
            if (inputRef.current)
              inputRef.current.value = '';
          }} ref={inputRef} type="text" id="input-text" />
          <p className='font-mono text-4xl truncate whitespace-pre'>{paragraphs[paraIndex].slice(visibleHolder)}</p>
        </div>
        <div className="flex mt-5 justify-between items-center border-t-2 pt-5">
          <h3 className='text-nowrap flex flex-col items-center'>Time left <span className='font-bold text-red-500'><h2>{time}s</h2></span></h3>
          <h3 className='text-nowrap flex flex-col items-center'>Mistakes <span className='font-bold text-blue-800'><h2>{mistakes}</h2></span></h3>
          <h3 className='text-nowrap flex flex-col items-center'>WPM <span className='font-bold text-blue-800'><h2>{wpm || 0}</h2></span></h3>
          <h3 className='text-nowrap flex flex-col items-center'>CPM <span className='font-bold text-blue-800'><h2>{cpm || 0}</h2></span></h3>
          <button className='bg-blue-400 w-30 h-10 rounded-xl font-bold text-white cursor-pointer' type="button" onClick={reset}>Try Again</button>
        </div>
      </div>
    </>
  )
}

export default TypingSpeedTest;