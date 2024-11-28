import { ReportDetailAnswer, ReportDetailResponse } from '../ctyrletymix/report/[reportId]/page';
import './ComponentStyles/MixResult.css'

interface Props {
    serverResponse: ReportDetailResponse
}
function UsernameWidget({ serverResponse }: Props) {

    return (
        <div id="mixResultFreshDiv">
            <div id="mixResultFreshHeader">
                <p>Otázka</p>
                <p>Vaše Odpověď</p>
                <p>Správná Odpověď</p>
            </div>
            <nav id='mixResultFreshContent'>
                {
                   serverResponse && serverResponse.answers.map((row: ReportDetailAnswer) => {
                        return (
                            <div key={row.id} id='answerRow'
                                style={!row.wasUserCorrect ? { backgroundColor: "#ffcccc" } : {}}>
                                <p>{row.question}</p>
                                <p>{row.wasUserCorrect ? row.answers[0] : row.answers[1]}</p>
                                <p>{row.answers[0]}</p>
                            </div>
                        )
                    })
                }
            </nav>
        </div>
    );
};

export default UsernameWidget;
