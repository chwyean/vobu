import React from 'react'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import './DisplayOptionControl.css';

function DisplayOptionControl(props) {
    return (
        <div className="hideControl">
            <div style={{"marginRight":20}}>Hide:</div>
            <ToggleButtonGroup name="hideOption" type="radio" value={props.value} 
                    onChange={props.onChangeHandle} vertical={false}>
                {Object.entries(props.options).map(([key, value]) => (
                    <ToggleButton className="hideButton" size="lg"
                        key={key} value={key}>{value}</ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}

export default DisplayOptionControl;
