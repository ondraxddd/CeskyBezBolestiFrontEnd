'use client'

import "./resetPageStyle.css"
import { Urls } from "@/app/Contexts/UrlsExport";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetTokenPage() {
    const router = useRouter()
    const token = useParams().resetToken;
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordReset = async (e: any) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Hesla se neshodují");
            return;
        }

        try {
            const response = await fetch(`${Urls.server}${Urls.updatepassword}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, newPassword })
            });

            if (response.ok) {
                alert("Heslo bylo úspěšně resetováno");
                router.push("/Auth/Login")
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
                            type="password"
                            value={newPassword}
                            placeholder="Nové heslo"
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            id="resetPassInput"
                            type="password"
                            value={confirmPassword}
                            placeholder="Kontrola nového hesla"
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
