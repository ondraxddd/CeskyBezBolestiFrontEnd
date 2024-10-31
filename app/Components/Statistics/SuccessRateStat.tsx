/* eslint-disable react-hooks/exhaustive-deps */
import "../ComponentStyles/SuccessRate.css"

interface Props {
    percent: string
}

export default function ClickerComponent({ percent }: Props) {

    return (
        <div id="successCard">
            <h2 id="successh2">Tvoje úspěšnost je</h2>
            <h1 id="successh1">{percent}%</h1>
        </div>
    )
}
