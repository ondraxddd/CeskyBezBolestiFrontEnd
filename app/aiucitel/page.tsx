'use client'
import { useState } from "react";
import "./style.css"
import { Urls } from "../Contexts/UrlsExport";

export default function AiUcitel() {

    const selectedModelStyle = {backgroundColor:"#FFA115"}
    const notSelectedModelStyle = {backgroundColor:"#fad49b"}

    const[firstModelButtonStyle, setFirstModelButtonStyle] = useState(selectedModelStyle)
    const[secondModelButtonStyle, setSecondModelButtonStyle] = useState(notSelectedModelStyle)
    const[idModelSelected, setIdModelSelected] = useState<number>(0)
    const[hasChatStarted, setHasChatStarted] = useState<boolean>(false)

    async function callAiApi(userQuestion: string) {

        const requestData = {
            questionPrompt: userQuestion
        }

        const aiEndpointUrl = idModelSelected == 0 ? Urls.askTomas : Urls.askRizzler
        const res = await fetch(Urls.server + aiEndpointUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(requestData),
        })

        if (!res.ok) {
            alert("Nastala chyba při kontaktování serveru, zkuste to prosím znovu později.")
        }

        const receivedMessage = await res.json()
        setHasChatStarted(true)
        addReceivedMessage(receivedMessage)

    }

    function sendMessage() {

        const input = document.querySelector('input');
        const chatBox = document.querySelector('.chat-box');
        if (input == null || chatBox == null) {
            alert("Nastala chyba. Zkuste to znovu později.")
            return
        }

        callAiApi(input.value.replaceAll("\"","'"))

        if (input.value.trim() !== '') {
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.textContent = input.value;
            chatBox.appendChild(userMessage);
            input.value = '';

            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    function addReceivedMessage(text: string) {

        const chatBox = document.querySelector('.chat-box');
        if (chatBox == null) {
            alert("Nastala chyba. Zkuste to znovu později.")
            return
        }

        const botMessage = document.createElement('div');
        botMessage.className = 'message received';
        botMessage.textContent = text;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function setTomasAsModel(){
        if(hasChatStarted){
            alert("Po začátku konverzace nelze změnit učitele!")
            return
        }

        setFirstModelButtonStyle(selectedModelStyle)
        setSecondModelButtonStyle(notSelectedModelStyle)
        setIdModelSelected(0)
    }

    function setRizzlerAsModel(){
        if(hasChatStarted){
            alert("Po začátku konverzace nelze změnit učitele!")
            return
        }

        setFirstModelButtonStyle(notSelectedModelStyle)
        setSecondModelButtonStyle(selectedModelStyle)
        setIdModelSelected(1)
    }

    return (
        <div id="aiChatPage">

            <h1 id="aiTeacherName">Ai Učitel - {idModelSelected == 0 ? "Tomáš" : "Rizzler"}</h1>

            <div className="chat-container">
                <div className="chat-box">
                    <div className="message received">Ahoj, já jsem tvůj digitální učitel. Můžeš se mě třeba zeptat, abych ti vysvětlil látku "Psaní velkých písmen" nebo konkrétní otázku, třeba "Proč ve spojení "být doma" píše tvrdé Y.</div>
                    <div className="message received">Jsem ale jenom umělá inteligence, a tak můžu dělat spoustu chyb. Proto všechno, co ti řeknu, si raději prověřuj.</div>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Napiš zprávu..." />
                    <button onClick={() => sendMessage()}>Odeslat</button>
                </div>
            </div>

            <div className="modelSwitch">
                <button onClick={()=>setTomasAsModel()} style={firstModelButtonStyle}>Tomáš</button>
                <button onClick={()=>setRizzlerAsModel()} style={secondModelButtonStyle}>Rizzler</button>
            </div>

        </div>
    )
}
