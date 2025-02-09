/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from "react"
import { Urls } from "../Contexts/UrlsExport"
import { SubcategoryDTO } from "../Interfaces/SubcategoryDTO"
import { questionDTO } from "../Interfaces/IQuestionDTO"
import "./ComponentStyles/Clicker.css"
import { getCookie } from "../GeneralFunctions"

interface Props {
    subCategory: SubcategoryDTO
}

export default function ClickerComponent({ subCategory }: Props) {

    let [questions, setQuestions] = useState<questionDTO[]>([])

    let [backgroundStyle, setBackgroundStyle] = useState()
    const [isMistakeReported, setMistakeReported] = useState<boolean>(false)

    const requestData = { subcatgid: subCategory.Id }

    let randomNumber = Math.round(Math.random())

    async function LoadQuestions() {
        console.log("Právě načítám otázky")
        const response = await fetch(Urls.server + Urls.getquestionsset, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(requestData),
        })
        if (response.ok) {
            const content = await response.json()
            setQuestions(content.Questions)
        }
    }

    useEffect(() => {
        LoadQuestions()
    }, [])

    async function removeQuestion() {
        setQuestions(prevArray => {
            // Vytvoří nové pole bez prvního prvku
            const newArray = prevArray.slice(1);
            return newArray;
        });
    };

    async function handleQuestions() {
        randomNumber = Math.round(Math.random())
        setMistakeReported(false)
        // check if there is enough questions in row
        if (questions.length < 3){
            LoadQuestions()
        }
        // remove first element
        removeQuestion()
    }

    async function handleAnswer(button: HTMLButtonElement) {

        const buttonText = button.textContent;
        if (!buttonText) return;
        let isCorrect = false;

        if (buttonText == questions[0].CorrectAnswer) {
            // correct answer
            setBackgroundStyle({ backgroundColor: "#0be647" })
            await new Promise(f => setTimeout(f, 250))
            setBackgroundStyle({ backgroundColor: "#DBDBF1" })
            isCorrect = true
        }
        else {
            // wrong answer
            setBackgroundStyle({ backgroundColor: "red" })
        }

        // dont send report about new mistake if once reported
        if (!isMistakeReported) {
            console.log("Jdu reportnout, ", isCorrect)
            const reportResponse = await fetch(Urls.server + Urls.recordmistake, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify({ QuestId: questions[0].QuestionId, WasCorrect: isCorrect }),
            })
            setMistakeReported(true)
        }

        // get new question if answered correctly
        if(isCorrect) handleQuestions()

    }



if (questions == undefined)
    return (
        <h1>Nepodařilo se nám načít jakkékoliv otázky. Zkuste to prosím znovu později.</h1>
    )
else {
    return (
        <div id="clicker" style={backgroundStyle}>
            <h1 id="clickerQuestion">{questions[0]?.QuestionText}</h1>

            <div id="answers">
                <button onClick={(event) => handleAnswer(event.target as HTMLButtonElement)} id="answerBtn">{randomNumber == 0 ? questions[0]?.FalseAnswer : questions[0]?.CorrectAnswer}</button>
                <button onClick={(event) => handleAnswer(event.target as HTMLButtonElement)} id="answerBtn">{randomNumber == 1 ? questions[0]?.FalseAnswer : questions[0]?.CorrectAnswer}</button>
            </div>

            {/* <button id="helpClicker">Nápověda</button> */}
        </div>
    )
}
}