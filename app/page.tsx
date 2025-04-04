'use client'
import Image from 'next/image'
import './home.css'
import Studium from '../public/studium.png'
import Link from 'next/link'
import { Urls } from './Contexts/UrlsExport';
import { useContext, useEffect, useState } from 'react';
import SubjectCard from './Components/SubjectCard'
import { FullSubjectsContext } from './Contexts/FullSubjects'
import { normalize } from 'path'
import { UserContext } from './Contexts/UserContext'

export interface SubCategory {
    Id: number;
    ParentCatgId: number;
    Desc: string;
}

export interface Category {
    Id: number;
    SubjectId: number;
    Title: string;
    Desc: string;
    SubCatgs: SubCategory[];
}

export interface Subject {
    Id: number;
    Title: string;
    Categories: Category[]; 
    FreeQuestionsCount: number;
    PaidQuestionsCount: number;
}

export const removeDiacriticsAndSpaces = (text: string): string => {
    // Normalizace textu pro odstranění diakritiky
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    text = text.replace("/", "")
    // Odstranění mezer a převod na malá písmena
    return text.replace(/\s+/g, '').toLowerCase();
};


export default function Home() {
    const fullSubjectsContext = useContext(FullSubjectsContext)
    const [allSubjects, setAllSubjects] = useState<Subject[]>([])
    //let allSubjects: Subject[] = []

    const DownloadSubjects = () => {
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
        .then((subjects: Subject[]) => {
            setAllSubjects(subjects)
            console.log("Jdu nastavit kontext subjektů")
            fullSubjectsContext?.setSubjects(subjects)
            console.log('Seznam subjektů:', subjects);
        })
        .catch(error => {
            console.error('Chyba:', error);
        });
    }

    useEffect(()=>{DownloadSubjects()}, [])
    const user = useContext(UserContext)
    return (
        <div>
            <div id="heroPage">
                <div id="mainText">
                    <h1>Česky<span id="black">BezBolesti</span></h1>
                    <p>Kvalitní a bezplatné doučování českého jazyka</p>
                    <button><a href="#ctgSelect" >Jdeme na to</a></button>
                </div>
                <div id="mainImage">
                    <div id="imageBackground">
                        <Image src={Studium} alt="Logo" />
                    </div>
                </div>

            </div>
            <div id="mainPros" style={{ textAlign: 'left' }}>
                <p><span>✔️</span> Vysvětlivka u každého cvičení</p>
                <p><span>✔️</span> Možnost vytištění zadání</p>
                <p><span>✔️</span> PDF Učebnice pro každé téma s možností stáhnutí</p>
                <p><span>✔️</span> Pravidelné aktualizace obsahu</p>
            </div>

            <div id="ctgSelect">
                <h1>Na co se podíváme?</h1>
                <div id="cards" style={{ textAlign: 'left' }}>
                   
                   {allSubjects.map((tempSubject:Subject)=>
                   <SubjectCard key={tempSubject.Id} subject={tempSubject}>
                   </SubjectCard>
                   )}

                </div>
            </div>

            <div id="prijMix">
                <h1>Trápí tě přijímačky na SŠ?</h1>
                <p><span>Přihlaš se</span> a vyzkoušej náš přijímačkový mix  postavený podle skutečných osnov na přijímačkové testy.
                    Mimo jiné získáš přístup k osobnímu přehledu, kde například zjistíš, co ti nejde, nebo na jakých cvičeních
                    se necháš často napálit.</p>
                <button><a href="ctyrletymix">Přijímačkový Mix</a></button>
            </div>
            <button onClick={()=>console.log("User context", user)}>Log user context</button>
        </div>
    )
}
