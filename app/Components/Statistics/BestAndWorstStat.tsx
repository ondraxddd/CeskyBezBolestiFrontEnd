/* eslint-disable react-hooks/exhaustive-deps */
import "../ComponentStyles/BestAndWorst.css"


interface Props{
    BestCategory: string;
    WorstCategory: string;
}

export default function BestAndWorst({BestCategory, WorstCategory} : Props) {

    return (
        <div id="bestAndWorstCard">
            <p className="bestAndWorstP">Nejvíce ti jde...</p>
            <h1 className="bestAndWorstH1">{BestCategory}</h1>
            <p className="bestAndWorstP">Nejhůře ti jde...</p>
            <h1 className="bestAndWorstH1">{WorstCategory}</h1>
        </div>
    )
}
