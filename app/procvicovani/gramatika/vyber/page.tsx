import './vyber.css'
import Image from 'next/image';
import Nigga from "../../../../public/nigga.jpg"
import Link from 'next/link';
import { Urls } from '@/app/Contexts/UrlsExport';

const getCategories = async () => {
    const res = await fetch(Urls.server + Urls.getcategories, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!res.ok) console.log("Categories were not able to load.")
    else {
        const data = await res.json();
        //console.log("Categories: ", data);
    }
}

export default async function Select() {
    getCategories()
    return (
        <>
            <div id="mainHeadline">
                <h1>Gramatika</h1>
                <section>
                    <p>1097 cvičení zdarma</p>
                    <p style={{ marginTop: 0 }}>1097 cvičení prémiových</p>
                </section>
            </div>

            <div id="cards">

                <Link href="/procvicovani/gramatika/IY" className="card">
                    <Image src={Nigga} alt="" />
                    <h2>Psaní I/Y</h2>
                </Link>
                <Link href="" className="card">
                    <Image src={Nigga} alt="" />
                    <h2>Velká písmena</h2>
                </Link>
                <Link href="" className="card">
                    <Image src={Nigga} alt="" />
                    <h2>Číslovky</h2>
                </Link>
                <Link href="" className="card">
                    <Image src={Nigga} alt="" />
                    <h2>Stavba slova</h2>
                </Link>
                <Link href="" className="card">
                    <Image src={Nigga} alt="" />
                    <h2>Psaní ě/je</h2>
                </Link>
                <Link href="" className="card">
                    <Image src={Nigga} alt="" />
                    <h2>Psaní ú/ů</h2>
                </Link>

            </div>

            <p id="mytip"><span>Tip: </span>Bílí to mají v životě jednodušší. Buď jako oni.</p>

            <p id="link">CeskyBezBolesti.cz</p>
        </>
    )
}
