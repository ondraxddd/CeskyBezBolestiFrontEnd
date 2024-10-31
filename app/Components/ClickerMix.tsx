/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react"
import { Urls } from "../Contexts/UrlsExport"
import { questionDTO } from "../Interfaces/IQuestionDTO"
import "./ComponentStyles/Clicker.css"
import MixResultFresh from "./MixResultFresh"

export default function ClickerMixComponent() {

    let [questions, setQuestions] = useState<questionDTO[]>([])
    const [qCounter, setQCounter] = useState<number>(1)
    const [answers, setAnswers] = useState<{ question: string, QuestionId: number, userAnswer: string, correctAnswer: string, isCorrect: boolean }[]>([])
    const [questionCount, setQuestionCount] = useState<number>(0)
    const [isMixReported, setIsMixReported] = useState<boolean>(false)
    const [areQuestionsLoaded, setAreQuestionsLoaded] = useState<boolean>(false)

    let [backgroundStyle, setBackgroundStyle] = useState()
    const [isMistakeReported, setMistakeReported] = useState<boolean>(false)

    let randomNumber = Math.round(Math.random())

    async function LoadQuestions() {
        const response = await fetch(Urls.server + Urls.getctyrletymix, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
        if (response.ok) {
            const content = await response.json()
            setQuestions(content.Questions)
            setQuestionCount(content.Questions.length)
            setAreQuestionsLoaded(true)
        }
    }

    useEffect(() => {
        LoadQuestions()
    }, [])

    async function removeQuestion() {
        setQuestions(prevArray => {
            const newArray = prevArray.slice(1);
            return newArray;
        });
    };

    async function handleQuestions() {
        randomNumber = Math.round(Math.random())
        setMistakeReported(false)
        removeQuestion()
        setQCounter(qCounter + 1)
    }

    async function handleAnswer(button: HTMLButtonElement) {

        const buttonText = button.textContent;
        if (!buttonText) return;
        let isCorrect = false;

        if (buttonText == questions[0].CorrectAnswer) {
            // correct answer
            isCorrect = true
        }

        // Save the answer to the answers array, including the correctAnswer
        setAnswers(prevAnswers => [
            ...prevAnswers,
            { question: questions[0].QuestionText, QuestionId: questions[0].QuestionId, userAnswer: buttonText, correctAnswer: questions[0].CorrectAnswer, isCorrect: isCorrect }
        ]);

        handleQuestions()
    }

    // Function to log answers
    function logAnswers() {
        const formattedAnswers = answers.map(answer => ({
            QuestId: answer.QuestionId,
            IsCorrect: answer.isCorrect
        }));

        const payload = {
            answers: formattedAnswers
        }

        console.log(payload)
    }

    async function sendReport(){
        const formattedAnswers = answers.map(answer => ({
            QuestId: answer.QuestionId,
            IsCorrect: answer.isCorrect
        }));

        const payload = {
            answers: formattedAnswers
        }
    
        try {
            const response = await fetch(Urls.server + Urls.reportmix, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                console.error("Failed to send answers");
            } else {
                console.log("Answers successfully sent");
            }
        } catch (error) {
            console.error("Error occurred while sending answers:", error);
        }
    }

    // Calculate correct and incorrect answers
    const correctAnswersCount = answers.filter(answer => answer.isCorrect).length;

    if (questions == undefined)
        return (
            <h1>Nepodařilo se nám načíst jakkékoliv otázky. Zkuste to prosím znovu později.</h1>
        )
    else if (questions.length == 0 && areQuestionsLoaded) {
        if(!isMixReported){
            console.log("Ted jdu reportovat")
            sendReport()
            setIsMixReported(true)
        }
        return (
            <div id="ClickerMixComplete">
                <h2>Došel si až na konec!</h2>
                <h1>Tvoje úspěšnost: {correctAnswersCount}/{answers.length}</h1>
                <a href="">Výsledky ostatních pokusů</a>
                <MixResultFresh answers={answers}></MixResultFresh>
            </div>
        )
    }
    else {
        return (
            <div id="clicker" style={backgroundStyle}>
                <h1 id="clickerQuestion">{questions[0]?.QuestionText}</h1>

                <div id="answers">
                    <button onClick={(event) => handleAnswer(event.target as HTMLButtonElement)} id="answerBtn">{randomNumber == 0 ? questions[0]?.FalseAnswer : questions[0]?.CorrectAnswer}</button>
                    <button onClick={(event) => handleAnswer(event.target as HTMLButtonElement)} id="answerBtn">{randomNumber == 1 ? questions[0]?.FalseAnswer : questions[0]?.CorrectAnswer}</button>
                </div>

                <p>{qCounter}/{questionCount}</p>
                <button id="helpClicker">Nápověda</button>
            </div>
        )
    }
}
