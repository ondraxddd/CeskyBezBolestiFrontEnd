/* eslint-disable react-hooks/exhaustive-deps */
import "../ComponentStyles/TimeSpentStat.css"

interface Props {
    minutes: string
}

export default function TimeSpentStat({ minutes }: Props) {

    return (
        <div id="timeSpentCard">
            <h3 id="timeSpenth3">Průměrně s námi strávíš</h3>
            <h1 id="timeSpenth1">{minutes}</h1>
            <h2 id="timeSpenth2">minut</h2>
            <h3>denně</h3>
        </div>
    )
}
