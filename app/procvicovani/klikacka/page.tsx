import './klikacka.css'

export default function Home() {
    // Potřeba jako parametr
    const category = "Vyjmenovaní slova po L"
    const apiPoint = ""

    // Získat přes API
    const question = "Mal_ Negr"
    const correctAnswer = "Ý"
    const wrongAnswer = "Í"
    const napoveda = "Prostě nebuď debil :)"

    return (
        <div id='klikacka'>
            <div id='klikContent'>
                <h2 id='ctgName'>{category}</h2>
                <h1 id='qst'>{question}</h1>
                <div id='ansBtns'>
                    <button id='ansBtn'>{correctAnswer}</button>
                    <button id='ansBtn'>{wrongAnswer}</button>
                </div>
                <button id='helpBtn'>Zobrazit nápovědu</button>
            </div>
        </div>
    )
}
