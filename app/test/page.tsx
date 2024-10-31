'use client'

import MixResultFresh from "../Components/MixResultFresh"


export default function Test() {

    const answers = [
        {
          question: "What is the capital of France?",
          QuestionId: 1,
          userAnswer: "Paris",
          correctAnswer: "Paris",
          isCorrect: true
        },
        {
          question: "What is 2 + 2?",
          QuestionId: 2,
          userAnswer: "5",
          correctAnswer: "4",
          isCorrect: false
        },
        {
          question: "Who painted the Mona Lisa?",
          QuestionId: 3,
          userAnswer: "Leonardo da Vinci",
          correctAnswer: "Leonardo da Vinci",
          isCorrect: true
        }
      ];

    return (
        <>
            <MixResultFresh answers={answers}></MixResultFresh>
        </>
    )
}
