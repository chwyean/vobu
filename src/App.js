import React from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayOptionControl from './DisplayOptionControl'
import MainWindow from './MainWindow';

const hideOptions = {
  "symbol":"symbol",
  "pinyin":"pinyin",
  "none":"none"
};

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      hideOption:"symbol"
    };
  }

  handleHideOptionChange = (option) => {
    this.setState((state) => ({
      ...state,
      hideOption: option
    }))
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Chinese Vocabulary Builder
          </h1>
          <MainWindow class="mainWindow"></MainWindow>
          <DisplayOptionControl className="displayOptionControl"
              value={this.state.hideOption}
              onChangeHandle={this.handleHideOptionChange}
              options={hideOptions}
          />
          <p>Chosen value: {hideOptions[this.state.hideOption]}</p>
        </header>
      </div>
    );
  }
}

export default App;
