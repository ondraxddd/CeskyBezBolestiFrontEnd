'use client'

import { useState } from "react";
import "../resetpassword/[resetToken]/resetPageStyle.css"
import { Urls } from "@/app/Contexts/UrlsExport";

export default function ResetTokenPage() {

    const[email, setEmail] = useState<string>()

    const handlePasswordReset = async (e: any) => {
        e.preventDefault();


        if (!email?.includes('@')) {
            alert("Špatně zadaný email!");
            return;
        }

        try {
            const response = await fetch(`${Urls.server}${Urls.resetpassword}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email:`${email}` })
            });

            if (response.ok) {
                alert("Do emailu vám přijde odkaz na resetování hesla.");
                setEmail("")
            } else {
                alert("Nastala chyba při resetování hesla");
            }
        } catch (error) {
            alert("Nastala chyba: " + error.message);
        }
    };

    return (
        <div id="resetPasswordPage">
            <h1 id="resetPassText">Resetování hesla</h1>
            <div id="resetPasswordWidget">
                <form onSubmit={handlePasswordReset} id="resetPassForm">
                    <label>
                        <input
                            id="resetPassInput"
                            value={email}
                            placeholder="Váš email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <button type="submit" id="resetPassBtn">Odeslat</button>
                </form>
            </div>
        </div>
    );
}
