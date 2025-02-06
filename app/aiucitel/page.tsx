'use client'
import { useState } from "react";
import "./style.css"
import { Urls } from "../Contexts/UrlsExport";

export default function AiUcitel() {

    async function callTomasAiApi(userQuestion:string){

        const requestData = {
            questionPrompt: userQuestion
        }

        const res = await fetch(Urls.server + Urls.askRizzler, { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(requestData),
        })

        if(!res.ok){
            alert("Nastala chyba při kontaktování serveru, zkuste to prosím znovu později.")
        }

        const receivedMessage = await res.json()
        console.log("Result: ")
        console.log(receivedMessage)
        addReceivedMessage(receivedMessage)

    }

    function sendMessage() {

        const input = document.querySelector('input');
        const chatBox = document.querySelector('.chat-box');
        if(input == null || chatBox == null) {
            alert("Nastala chyba. Zkuste to znovu později.")
            return
        }
        
        callTomasAiApi(input.value)

        if (input.value.trim() !== '') {
            const userMessage = document.createElement('div');
            userMessage.className = 'message sent';
            userMessage.textContent = input.value;
            chatBox.appendChild(userMessage);
            input.value = '';
            
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }
    
    function addReceivedMessage(text:string) {

        const chatBox = document.querySelector('.chat-box');
        if(chatBox == null) {
            alert("Nastala chyba. Zkuste to znovu později.")
            return
        }

        const botMessage = document.createElement('div');
        botMessage.className = 'message received';
        botMessage.textContent = text;
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    return (
        <div id="aiChatPage">
            <h1 id="aiTeacherName">Ai Učitel - Rizzler</h1>
            <div className="chat-container">
                <div className="chat-box">
                    <div className="message received">Ahoj, já jsem Tomáš, tvůj digitální učitel.</div>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Napiš zprávu..."/>
                    <button onClick={()=>sendMessage()}>Odeslat</button>
                </div>
            </div>
        </div>
    )
}
