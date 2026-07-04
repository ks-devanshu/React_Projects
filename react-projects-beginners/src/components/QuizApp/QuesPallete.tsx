import { useState } from "react";
import type { Question } from "./QuizApp";


const QuesPallete = ( {question, onSubmit} : {question:Question, onSubmit:(optionSelected:string) => void} ) => {
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <div>
            <h2 className="text-gray-400 text-4xl font-bold mt-8">Question {question.id}</h2>
            <h3 className="text-3xl font-bold mt-8 mb-5">{question.statement}</h3>
            {
                question.options.map( (opt, index) => <span key={index} className="flex items-center text-2xl">
                    <input className="w-5 h-5 m-4 cursor-pointer" type="radio" name="options" id={opt} checked={selectedOption == opt } onChange={(event) => setSelectedOption(event.target.value)} value={opt} /><label className="cursor-pointer" htmlFor={opt}>{opt}</label><br />
                </span> )
            }
            <button className="w-30 h-10 rounded-xl text-l text-white bg-blue-500 font-bold cursor-pointer my-5" onClick={() => {
                if (selectedOption)
                    onSubmit(selectedOption);
                setSelectedOption('');
            }}>Submit</button>
        </div>
    )
}

export default QuesPallete;