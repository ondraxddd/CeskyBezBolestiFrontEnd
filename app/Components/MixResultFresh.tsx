import './ComponentStyles/MixResult.css'

interface Props {
    answers: { question: string, QuestionId: number, userAnswer: string, correctAnswer: string, isCorrect: boolean }[]
}
function UsernameWidget({ answers }: Props) {

    return (
        <div id="mixResultFreshDiv">
            <div id="mixResultFreshHeader">
                <p>Otázka</p>
                <p>Vaše Odpověď</p>
                <p>Správná Odpověď</p>
            </div>
            <nav id='mixResultFreshContent'>
                {answers.map((answer) => {
                    return (
                        <div key={answer.QuestionId} id='answerRow'
                         style={!answer.isCorrect ? {backgroundColor:"#ffcccc"} : {}}>
                            <p>{answer.question}</p>
                            <p>{answer.userAnswer}</p>
                            <p>{answer.correctAnswer}</p>
                        </div>
                    )
                })}
            </nav>
        </div>
    );
};

export default UsernameWidget;
