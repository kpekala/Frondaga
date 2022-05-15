import * as React from 'react';
import { PopUp } from '../common/components/PopUp';
import { QuizesView } from '../views/QuizesView';
import { QuizData } from '../views/QuizesView';


function sendAnswers(answers: number[]) {
    console.log("All answers: " + answers);
}

const quizes: QuizData[] = [
    { answers: ["XD", "xD"], question: "Ktore lepsze?" },
    { answers: ["Xd", "xd"], question: "A tutaj ?" },
    { answers: [":O", ":()"], question: "XDDDD?" }
];

export function QuizTestView() {
    return (
        <>
            <PopUp>
                <QuizesView
                    sendAnswers={(answers: number[]) => {
                        sendAnswers(answers);
                    }}
                    quizes={quizes} />
            </PopUp>
        </>
    );
}
