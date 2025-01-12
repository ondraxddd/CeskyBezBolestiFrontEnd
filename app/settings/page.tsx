"use client"
import { useContext, useEffect, useState } from "react"
import "./style.css"
import { UserContext } from "../Contexts/UserContext"

export default function Settings() {
    const user = useContext(UserContext)
    console.log("Prvotní načtení, user je: ", user)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

    useEffect(()=>{
        console.log("Ted se username změnil, user je ", user)
    },[user?.username])
    
    if(isLoggedIn == false){
        return(<><h1>User must be logged in first.</h1>
            <button onClick={()=>console.log("User context", user)}>Log user context</button>
        <button onClick={()=>console.log(isLoggedIn)}>Log boolean</button>
        <button onClick={()=>console.log(user?.username)}>Log user.username</button>
        </>)
        
    }
    else{

    return (    
    <div className="settings-page">
        <h1>Nastavení účtu</h1>
        <h2>Změna hesla</h2>
        <form className="password-form" action="/change-password" method="POST">
            <div className="form-group">
                <label htmlFor="current-password">Aktuální heslo</label>
                <input type="password" id="current-password" name="current-password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="new-password">Nové heslo</label>
                <input type="password" id="new-password" name="new-password" required/>
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Potvrzení nového hesla</label>
                <input type="password" id="confirm-password" name="confirm-password" required/>
            </div>
            <button type="submit" className="submit-btn">Změnit heslo</button>
        </form>
        <h2>Smazat účet</h2>
        <button className="delete-account-btn">Smazat účet</button>
        
    </div>

    )}
}
