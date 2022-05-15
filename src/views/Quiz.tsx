import * as React from 'react';
import './Quiz.scss'
import { AnswerButton } from './AnswerButton';
import { Button } from '_/common/components';
import { getHooks } from 'html-webpack-plugin';
import { MenuButton } from './MenuButton';
import { SendAnswerButton } from './SendAnswerButton';


export interface QuizProps {
    answers: string[];
    question: string;
    onClick: (answer: string) => void;
}

function renderAnswers(props: QuizProps, setAnswer: (value: string) => void){
    const buttons = [];
    for(const answer of props.answers){
        buttons.push(<AnswerButton value={answer} onClick={()=> setAnswer(answer)}/>)
    }
    return buttons;
}

export function Quiz(props: QuizProps) {
    const [answer, setAnswer] = React.useState("none");
    return (
        <div className='Quiz'>
            <label className='Quiz__question'>{props.question}</label>
            {renderAnswers(props, setAnswer)}
            <SendAnswerButton onClick={() => props.onClick(answer)}>
                Zatwierdź
            </SendAnswerButton>
        </div>
    );
}