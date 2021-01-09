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

            <style type="text/css">
                {`
                .btn-xxl {
                padding: 10pt;
                font-size: calc(10pt + 2vw);
                }
                `}
            </style>

            <div className="mainButtons">
                <Button className="mainButton" variant='primary' size="xxl"
                    onClick={props.mainButtonHandler}>{props.buttonMode}</Button>
            </div>
        </div>
    );
}

export default MainWindow;