import * as React from 'react';
import './TutorialPopUp.scss';

export interface TutorialPopUpProps {
    onClose?: () => void;
}

export function TutorialPopUp(props: TutorialPopUpProps) {
    return (
        <div className='TutorialPopUp'>
            <div className='TutorialPopUp__inner'>
                <div
                    className='escapeButton'
                    onClick={e => { if (props.onClose) props.onClose(); }}
                ></div>
                <span>Zasady</span> <br/>
                <span>
                Grę rozpoczyna się z pustą kartką, gracze na przemian stawiają kreski 
                na krawędziach kratek. Gracz, który jako ostatni wykona ruch zamykający pewien obszar, odpowiada na quiz,
                a gdy odpowie poprawnie na wszystkie pytania,
                przejmuje go i cieniuje (lub w inny sposób oznacza) jako swoje terytorium. 
                Gra toczy się do zacieniowania ostatniej wolnej kratki. 
                Gracz, którego terytorium jest większe, wygrywa.
                Zwykle w kreski gra się w dwie osoby, w grze może jednak uczestniczyć większa liczba graczy. 
                Nie ma ograniczeń co do wielkości planszy, najczęściej stosuje się kartkę formatu A5.
                </span>
            </div>
        </div>
    );
}