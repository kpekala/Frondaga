import './QuizesView.scss';

import * as React from 'react';
import { useState } from 'react';
import { Quiz } from './Quiz';

export interface QuizData {
    question: string;
    answers: string[];
}

export interface QuizesProps {
    sendAnswers(answers: number[]): void;
    quizes: QuizData[];
}

export function QuizesView(props: QuizesProps) {
    const [answers, setAnswers] = useState<number[]>([]);
    const [questionIndex, setQuestionIndex] = useState(0);

    const arr = [];
    for (const quiz of props.quizes) {
        arr.push(<Quiz question={quiz.question}
            answers={quiz.answers}
            onClick={(answer: number) => {
                const answerIdx = answer;
                const newAnswers = [...answers, answerIdx];
                setAnswers(newAnswers);

                if (questionIndex >= props.quizes.length - 1) {
                    props.sendAnswers(newAnswers);
                    return;
                }

                setQuestionIndex(questionIndex + 1);
            }} />);
    }

    return (<div>
        {arr[questionIndex]}
    </div>);
}

