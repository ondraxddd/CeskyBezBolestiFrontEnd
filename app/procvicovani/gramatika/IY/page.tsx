'use client'
import Link from 'next/link'
import Image from 'next/image'
import './IY.css'
import pdfIcon from "../../../../public/pdfIconpng.png"
import { useContext } from 'react'

export default function IY() {
   
    return (
    <div id='iytopic'>
        <h1 id='topicHeadline'>Psaní I/Y</h1>
        
        <div>

        </div>

        <div id='topicCardCtg'>
            <h2 id='excHeadline'>Vyjmenovaná slova</h2>
            <ul>
                <li><Link href="../klikacka">Mix</Link></li>
                <li><Link href="">Vyjmenovaná slova po B</Link></li>
                <li><Link href="">Vyjmenovaná slova po L</Link></li>
                <li><Link href="">Vyjmenovaná slova po M</Link></li>
                <li><Link href="">Vyjmenovaná slova po P</Link></li>
                <li><Link href="">Vyjmenovaná slova po S</Link></li>
                <li><Link href="">Vyjmenovaná slova po V</Link></li>
                <li><Link href="">Cizí slova</Link></li>
            </ul>
            <button id='ucebnice'><Image src={pdfIcon} alt="" id='ucebniceImg'/>Učebnice</button>
        </div>

        <div id='topicCardCtg'>
            <h2 id='excHeadline'>Tvrdé a měkké souhlásky</h2>
            <ul>
                <li><Link href="">Mix</Link></li>
                <li><Link href="">H, CH, K, R, D, T, N, P, S, V, Z</Link></li>
                <li><Link href="">Výslovnost</Link></li>
                <li><Link href="">Cizí Slova</Link></li>
            </ul>
            <button id='ucebnice'><Image src={pdfIcon} alt="" id='ucebniceImg'/>Učebnice</button>

        </div>
    </div>
)

}
