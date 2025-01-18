"use client"
import { useContext, useEffect, useState } from "react"
import "./style.css"
import { UserContext } from "../Contexts/UserContext"
import { Urls } from "../Contexts/UrlsExport"

export default function Settings() {
    const user = useContext(UserContext)
    console.log("Prvotní načtení, user je: ", user)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const[oldPassword, setOldPassword] = useState<string>("")
    const[newPassword, setNewPassword] = useState<string>("")
    const[newPassword2, setNewPassword2] = useState<string>("")

    useEffect(() => {
        if (user?.username) {
          setIsLoggedIn(true)
          console.log("Ted se username změnil, user je ", user?.username)
        } else {
          setIsLoggedIn(false)
        }
      }, [user])

      
    const ChangePassword = async () =>{

        const res = await fetch(Urls.server + Urls.changepassword, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({oldPassword:oldPassword, newPassword:newPassword}),
        })

        if(!res.ok){
            alert("Něco se pokazilo. Zkontrolujte heslo nebo to zkuste později.")
        }
        else{
            alert("Heslo změněno úspěšně.")
        }
    }  

    const handlePasswordChangeSubmit = () =>{

        if(!(newPassword == newPassword2)){
            alert("Nové hesla se neshodují.")
            return
        }

        ChangePassword()
    }
      
    if(isLoggedIn == false){
        return(<><h1>User must be logged in first.</h1>
            <button onClick={()=>console.log("User context", user)}>Log user context</button>
        </>)
        
    }
    else{

    return (    
    <div className="settings-page">
        <h1>Nastavení účtu</h1>
        <h2>Změna hesla</h2>
        <form className="password-form" method="POST">
            <div className="form-group">
                <label htmlFor="current-password">Aktuální heslo</label>
                <input type="password" id="current-password" onChange={(e)=>setOldPassword(e.target.value)} name="current-password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="new-password">Nové heslo</label>
                <input type="password" onChange={(e)=>setNewPassword(e.target.value)} id="new-password" name="new-password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Potvrzení nového hesla</label>
                <input type="password" onChange={(e)=>setNewPassword2(e.target.value)} id="confirm-password" name="confirm-password" required/>
            </div>
            <button type="submit" onClick={handlePasswordChangeSubmit} className="submit-btn">Změnit heslo</button>
        </form>
        <h2>Smazat účet</h2>
        <button className="delete-account-btn" >Smazat účet</button>
        
    </div>

    )}
}
