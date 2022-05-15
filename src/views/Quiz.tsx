import './Quiz.scss';

import * as React from 'react';
import { AnswerButton } from './AnswerButton';
import { SendAnswerButton } from './SendAnswerButton';
import { useState } from 'react';


export interface QuizProps {
    answers: string[];
    question: string;
    onClick: (answer: number) => void;
}

function renderAnswers(props: QuizProps, setAnswer: (value: number) => void) {
    return props.answers.map((answer, idx) => (
        <AnswerButton key={idx} value={answer} 
            onClick={() => setAnswer(props.answers.indexOf(answer))} />
    ));
}

export function Quiz(props: QuizProps) {
    const [answerIndex, setAnswerIndex] = useState<number|null>(null);

    return (
        <div className='Quiz'>
            <label className='Quiz__question'>{props.question}</label>
            {renderAnswers(props, setAnswerIndex)}
            <SendAnswerButton disabled={answerIndex === null} onClick={() => {
                if (answerIndex !== null)
                    props.onClick(answerIndex);
            }}>
                Zatwierdź
            </SendAnswerButton>
        </div>
    );
}
