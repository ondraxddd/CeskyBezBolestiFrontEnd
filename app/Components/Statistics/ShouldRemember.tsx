import { randomInt } from "crypto";
import "../ComponentStyles/ShouldRemember.css"

interface Props {
    data: ToRememberServerResponse
}

export interface ToRememberResponseItem {
    [key: string]: string;
}

export type ToRememberServerResponse = ToRememberResponseItem[];

export default function ShouldRemember({ data }: Props) {

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const key = Object.keys(data[i])[0]
        const value = item[Object.keys(item)[0]];
    }

    return (
        <div id="shouldRemember">
            <h1 id="shouldRememberH1">Už by sis mohl pamatovat, že...</h1>
            <div id="toRememberDisplay">
            {
                data.map((item: ToRememberResponseItem, index:number) => (
                    <div id="toRememberItem" key={index}>
                        <h2 id="toRememberItemH2">{Object.keys(item)[0]}</h2>
                        <h2 id="toRememberItemH2" style={{color: "#FFA115"}}>{item[Object.keys(item)[0]]}</h2>
                    </div>
                ))
            }
            </div>
        </div>
    )
}