import { useState } from "react";
import QuesPallete from "./QuesPallete";

export type Question = {
    id:number,
    statement:string,
    options:string[],
    answer:string
}

const questionBank:Question[] = [
    {
        id: 1,
        statement: "What is the capital of Haryana?",
        options: ["Yamunanagar", "Panipat", "Gurgaon", "Chandigarh"],
        answer: "Chandigarh",
    },
    {
        id: 2,
        statement: "What is the capital of Punjab?",
        options: ["Patiala", "Ludhiana", "Amritsar", "Chandigarh"],
        answer: "Chandigarh",
    },
    {
        id: 3,
        statement: "What is the capital of India?",
        options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "Delhi"
    },
    {
        id: 4,
        statement: "What is the capital of Uttarakhad?",
        options: ["Roorkee", "Haridwar", "Dehradun", "Nanital"],
        answer: "Dehradun"
    },
    {
        id: 5,
        statement: "What is capital of Uttar Pradesh?",
        options: ["GB Nagar", "Lucknow", "Prayagraj", "Agra"],
        answer: "Lucknow"
    },
];

let score = 0;

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleSubmit = (selected:string) => {
        if (selected === questionBank[currentQuestion].answer)
            score++;
        setCurrentQuestion(currentQuestion+1);
    }

    return (
        <div className="flex flex-col w-250 px-10 pb-10 place-self-center items-center shadow-2xl mt-8 rounded-xl">
            <h1 className="text-8xl font-bold mt-10 text-blue-400 uppercase">Quiz <span className="text-red-400">App</span></h1>
            <div className="flex flex-col w-full mt-5">
                {currentQuestion < questionBank.length ? <QuesPallete question={questionBank[currentQuestion]} onSubmit={handleSubmit} /> : <div className="flex flex-col items-center">
                    <h2 className="text-5xl text-gray-500 font-bold m-5">Result</h2>
                    <h3 className="text-3xl font-bold m-5">Your score: <span className="text-red-600 text-5xl">{score}</span></h3>
                </div>}
            </div>
        </div>
    )
}

export default QuizApp;