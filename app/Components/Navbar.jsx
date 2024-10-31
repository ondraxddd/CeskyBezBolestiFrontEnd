'use client'
import { useContext, useEffect } from 'react';
import './Navbar.css'; // Pokud máte oddělený CSS soubor pro navigační lištu
import Link from 'next/link';
import { UserContext } from '../Contexts/UserContext';
import { useState } from 'react';
import { getCookie } from '../GeneralFunctions';
import { Urls } from '../Contexts/UrlsExport';
import UsernameWidget from './UsernameWidget';

function Navbar() {
  const [username, setUsername] = useState("Přihlásit se")
  const user = useContext(UserContext)
  const [elapsedTime, setElapsedTime] = useState(0);

  async function getUsername() {

    setUsername("Logged in")
    const userResponse = await fetch(Urls.server + Urls.getuser,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
      })

    if (userResponse.ok) {
      const userObject = await userResponse.json()
      setUsername(userObject.Username)
      user.username = userObject.Username
    }
  }

  useEffect(() => { getUsername() }, [])




  // save time spent
  const [timeDifference, setTimeDifference] = useState(10);

  useEffect(() => {
    // Zaznamenání času otevření stránky
    const openingTime = new Date().getTime();

    // Funkce pro výpočet rozdílu času při odchodu ze stránky
    const handleBeforeUnload = async () => {
      const currentTime = new Date().getTime();
      const differenceInMinutes = Math.round((((currentTime - openingTime) % 86400000) % 3600000) / 60000);
      //const differenceInMinutes = currentTime - openingTime
      setTimeDifference(differenceInMinutes);
      console.log("Time spent: ", differenceInMinutes)
      //if(timeDifference < 2) return
      await fetch(Urls.server + Urls.savesesiontime, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include",
        body: JSON.stringify({ SesionMinutes: differenceInMinutes }),
      })
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup funkce pro odebrání zachytávání události před vykreslením komponenty
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []); // Efekt se spustí pouze při prvotním vykreslení komponenty

  return (
    <nav>
      <div id="navLeft">
        <Link href="https://youtube.com">O nás</Link>
        <Link href="https://youtube.com">FaQ</Link>
        <Link href="https://youtube.com">Cena</Link>
        <Link href="/">Home</Link>
      </div>
      <div id="navRight">
        {
          user.username == null ?
          <Link href="/Auth/Login">Přihlášení</Link>
          : <UsernameWidget username={user.username}></UsernameWidget>
        }
        {/* <Link href="/Auth/Login">{user.username == null ? "Přihlášení" : user.username}</Link>
        <UsernameWidget username={user.username}></UsernameWidget> */}
        {/* <Link href="/Auth/Login">{username}</Link> */}
      </div>
    </nav>
  );
};

export default Navbar;
