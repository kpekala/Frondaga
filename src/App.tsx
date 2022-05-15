import * as React from 'react';
import { useState } from 'react';
import { Button } from "./common/components";
import { MenuView } from "./views";
import { GameView } from './views';
import { Checkbox } from "./common/components";
import { AnswerButton } from './views/AnswerButton';
import { PopUp } from './views/PopUp';
import { Quiz } from './views/Quiz';


function clickMe() {
    console.log("Button is clicked");
}

function onClick(answer: string){
    console.log("AnswerClicked: " + answer)
}

export function App() {
    const [checked, setChecked] = useState(false);
    
    return (
        <div>
            {/* <h1>Hello! Urodaga here</h1> */}
            {/* <MenuView /> */}
            {/* <GameView /> */}
            {/* <Button onClick={clickMe}>
                Click me!
            </Button> */}
            {/* <div>
                <Checkbox label={"asdsd"} checked={checked} onChecked={setChecked} />
            </div> */}
            <PopUp>
                <Quiz question='Ile mam lat' answers={["1", "10", "21", "1000"]} onClick = {onClick}/>
            </PopUp>
        </div>
    );
}
