'use client';
import { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import Link from 'next/link';
import { UserContext } from '../Contexts/UserContext';
import { Urls } from '../Contexts/UrlsExport';
import UsernameWidget from './UsernameWidget';
import { Button } from '@nextui-org/button';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

function Navbar() {
  const [username, setUsername] = useState('Přihlásit se');
  const user = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  async function getUsername() {
    const userResponse = await fetch(Urls.server + Urls.getuser, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (userResponse.ok) {
      const userObject = await userResponse.json();
      setUsername(userObject.Username);
      user.setUserData(userObject.Username, null);
    }
  }

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <nav>
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </div>
      <div id="navLeft" className={menuOpen ? 'open' : ''}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>
          <AiOutlineClose size={30} />
        </button>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/aiucitel" onClick={() => setMenuOpen(false)}>Ai Učitel</Link>
        <Link href="https://youtube.com" onClick={() => setMenuOpen(false)}>O nás</Link>
        <Link href="https://youtube.com" onClick={() => setMenuOpen(false)}>FaQ</Link>
        <Link href="https://youtube.com" onClick={() => setMenuOpen(false)}>Cena</Link>
      </div>
      <div id="navRight">
        {user.username == null ? (
          <Link href="/Auth/Login">Přihlášení</Link>
        ) : (
          <UsernameWidget username={user.username} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
