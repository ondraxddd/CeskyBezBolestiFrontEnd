'use client'
import { useRouter } from 'next/navigation';
import { use, useContext, useState } from 'react';
import './login.css'
import { Urls } from '@/app/Contexts/UrlsExport';


import Link from "next/link"
import { UserContext } from '@/app/Contexts/UserContext';
import { link } from 'fs';

const url = Urls.server
const loginPath = Urls.login
const userPath = "/getuser"


export default function Login() {

    const existsWarning = document.getElementById("warning");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [borderColor, setBorderColor] = useState('');
    const [borderColorPassword, setBorderColorPassword] = useState('');
    const router = useRouter()
    const userContext = useContext(UserContext); 
    

    //TODO: Zbavit se getElemetById, a udělat funkce na vypisování errorů do blocku

    // on button click
    async function LoginUser(): Promise<void> {
        if (!(await validateForm())) {
            return;
        }

        const requestData = {
            "password": password,
            "email": email
        }
        try {
            const res = await fetch(url + loginPath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
                body: JSON.stringify(requestData),
            }) 
            // wrong credentials
            if (!res.ok) {
                existsWarning!.style.display = "Block"
                existsWarning!.innerHTML = "Špatné přihlašovací údaje."
                existsWarning!.style.color = "Red"
                return;
            }

            // TODO save user data in user context
            const userResponse = await fetch(url + userPath,
            {
                method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',},
                credentials: "include",
            })
            if(!userResponse.ok){
                existsWarning!.style.display = "Block"
                existsWarning!.innerHTML = "Špatné přihlašovací údaje."
                existsWarning!.style.color = "Red"
                return;
            }
            const userData = await userResponse.json()
            console.log(userData)
            userContext?.setUserData(userData.Username, userData.FirstName)
            console.log("Logged in")
            router.push("/")
            }  
        // our server is down
        catch {
            existsWarning!.style.display = "Block"
            existsWarning!.innerHTML = "Stala se chyba na naší straně, zkuste to znovu později. Děkujeme."
            existsWarning!.style.color = "Red"
        }

    }

    const handleButtonClick = async () => {
        await LoginUser();
    };

    const validateForm = async (): Promise<boolean> => {
        // Resetujte barvy na výchozí hodnoty
        setBorderColor('');
        setBorderColorPassword('');

        let isCorrect = true;

        // Kontrola pro email
        if (email.length < 4 || !email.includes('@')) {
            setBorderColor('1px solid red');
            isCorrect = false;
        }

        // Kontrola pro heslo
        if (password.length < 5) {
            setBorderColorPassword('1px solid red');
            isCorrect = false;
        }

        return isCorrect;
    };

    return (
        <>
            <div id="content">
                <div id="frame">
                    <div id="image"></div>
                    <div id="form">
                        <h1>Přihlášení</h1>
                        <form>
                            <input type="email" onChange={e => { setEmail(e.currentTarget.value) }} style={{ border: borderColor }} placeholder="Váš@email.cz" /> <br />
                            <input type="password" onChange={e => { setPassword(e.currentTarget.value) }} style={{ border: borderColorPassword }} placeholder="Heslo" /><br />
                        </form>
                        <Link href="/Auth/Register">Ještě nemáte učet? Zaregistrujte se.</Link>
                        <Link href="/requestpasswordreset">Zapomněl jsem heslo</Link>
                        <h3 id='warning'>Někde se stala chyba. Zkuste to později. Děkujeme.</h3>
                        <button id="btn" onClick={handleButtonClick}>Přihlásit se</button>
                    </div>
                </div>
            </div>
        </>
    )
}
