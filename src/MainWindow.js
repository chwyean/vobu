import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import './MainWindow.css';

function MainWindow(props) {
    return (
        <div className="mainWindow">
            {/* <div className="pinyinTextbox">nǐ hǎo</div>
            <div className="symbolTextbox">你好</div> */}
            <div className="pinyinTextbox">{props.wordPinyin}</div>
            <div className="symbolTextbox">{props.wordSymbol}</div>

            <div className="mainButtons">
                <Button className="mainButton" size='lg'>Reveal</Button>
                <Button className="mainButton" size='lg' variant='primary'
                    onClick={props.nextButtonHandler}>Next</Button>
            </div>
        </div>
    );
}

export default MainWindow;