import React from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import './MainWindow.css';

function MainWindow(props) {
    return (
        <div className="mainWindow">
            <div className="pinyinTextbox">nǐ hǎo</div>
            <div className="symbolTextbox">你好</div>

            <div className="mainButtons">
                <Button className="showButton" size='lg'>Show</Button>
                <Button className="nextButton" size='lg' variant='primary'>Next</Button>
            </div>
        </div>
    );
}

export default MainWindow;