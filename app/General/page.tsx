'use client'
import { Urls } from '../Contexts/UrlsExport';

export default function Home() {

    // Provedení HTTP požadavku a zpracování odpovědi
    const CallApi = () => {
        fetch(Urls.server + Urls.getallsubjects, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((subjects: any) => {
                console.log('Seznam subjektů:', subjects);
            })
            .catch(error => {
                console.error('Chyba:', error);
            });
    }

    return (
        <div>
            <h1>Niggggga</h1>
            <button onClick={()=>{CallApi()}}>Load </button>
        </div>
    )
}
