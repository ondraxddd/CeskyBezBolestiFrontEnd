'use client'
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import './register.css'
import { Urls } from '@/app/Contexts/UrlsExport';


import Link from "next/link"
 
const url = Urls.server
const path = Urls.register


export default function Register() {
    const router = useRouter()

    const[firstName, setFirstName] = useState('')
    const[lastName, setLastName] = useState('')
    const[nickname, setNickname] = useState('')
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[password2, setPassword2] = useState('')
    
    const [borderColorFirstName, setBorderColorFirstName] = useState('');
    const [borderColorLastName, setBorderColorLastName] = useState('');
    const [borderColorNickname, setBorderColorNickname] = useState('');
    const [borderColorEmail, setBorderColorEmail] = useState('');
    const [borderColorPassword, setBorderColorPassword] = useState('');
    const [borderColorPasswordCheck, setBorderColorPasswordCheck] = useState('');

    const [warning, setWarning] = useState("");

    const validateForm = async (): Promise<boolean> => {
        let isValid = true

        if(firstName.length < 2){
            isValid = false;
            setBorderColorFirstName("1px solid red")
        }
        else{
            setBorderColorFirstName("none")
        }

        if(lastName.length < 2){
            isValid = false;
            setBorderColorLastName("1px solid red")
        }
        else{
            setBorderColorLastName("none")
        }

        if(nickname.length < 5){
            isValid = false
            setBorderColorNickname("1px solid red")
        }
        else{
            setBorderColorNickname("none")
        }

        if(email.length < 4 || !email.includes("@")){
            isValid = false
            setBorderColorEmail("1px solid red")
        }
        else{
            setBorderColorEmail("none")
        }

        if(password != password2){
            isValid = false
            setBorderColorPassword("1px solid red")
            setBorderColorPasswordCheck("1px solid red")
        }
        else{
            setBorderColorPassword("none")
            setBorderColorPasswordCheck("none")
        }

        return isValid
    }

    const handleRegistrationButton = async () => {
        if (!(await validateForm())) {
            return;
        }

        const requestData = {
            FirstName: firstName,
            LastName: lastName,
            Username: nickname,
            Email: email,
            Password: password
        }

        try{
            const res = await fetch(Urls.server + Urls.register, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(requestData),
            }) 
            // wrong credentials
            if (!res.ok) {
                setWarning("Tento email je již registrován.")
                return;
            }
            console.log("User registrovan")
            router.push("/Auth/Login")
        }
        catch{
            setWarning("Naše servery mají výpadek. Prosím, zkuste to znovu později.")
        }
    } 

    return (
        <>
            <div id="content">
                <div id="frame">
                    {/* <div id="image"></div> */}
                    <div id="form">
                        <h1>Registrace</h1>
                        <form>
                            <input type="text" className="credentials" onChange={(e)=>{setFirstName(e.currentTarget.value)}} style={{border :borderColorFirstName}} placeholder="Jméno" />
                            <input type="text" className="credentials secondcred" onChange={(e)=>{setLastName(e.currentTarget.value)}} style={{border :borderColorLastName}} placeholder="Příjmení" /><br />
                            <input type="text" id='username' onChange={(e)=>{setNickname(e.currentTarget.value)}} style={{border :borderColorNickname}} placeholder="Přezdívka" /><br />
                            <input type="email" placeholder="Váš@email.cz" onChange={(e)=>{setEmail(e.currentTarget.value)}} style={{border :borderColorEmail}} /><br />
                            <input type="password" placeholder="Heslo" onChange={(e)=>{setPassword(e.currentTarget.value)}} style={{border :borderColorPassword}} /><br />
                            <input type="password" placeholder="Zopakujte heslo" onChange={(e)=>{setPassword2(e.currentTarget.value)}} style={{border :borderColorPasswordCheck}} /><br />
                        </form>
                        <br />
                        <p style={{fontSize: 16, color:"Red"}}>{warning}</p>
                        <button id="btn" onClick={()=>handleRegistrationButton()}>Zaregistrovat se</button>
                        <a href="/Auth/Login">Už máte účet? Přihlaste se.</a>
                    </div>
                </div>
            </div>
        </>
    )
}
