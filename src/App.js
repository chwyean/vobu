import React from 'react';
import './App.css';
import DisplayOptionControl from './DisplayOptionControl'
import MainWindow from './MainWindow';

import Papa from 'papaparse';


const hideOptions = {
  "none":"none",
  "symbol":"symbol",
  "pinyin":"pinyin",
};

const dataFilePath = 'vocab-raw-test.csv';
//const localDataFilePath = 'vocab-raw-test.csv';
const localDataFilePath = 'vocab-raw.csv';

class App extends React.Component {

  wordData=null;
  currentWordIndex = -1;
  randomize = true;

  constructor(props){
    super(props)
    this.state = {
      hideOption:"none",
      wordPinyin:"nǐ hǎo", // load initial value
      wordSymbol:"你好",
    };
  }
 
  handleHideOptionChange = (option) => {
    this.setState((state) => ({
      ...state,
      hideOption: option
    }))
  };

  componentDidMount() {
    this.readDataFile();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Chinese Vocabulary Builder
          </h1>
          <MainWindow class="mainWindow"
              wordPinyin={this.state.wordPinyin}
              wordSymbol={this.state.wordSymbol}
              nextButtonHandler={this.handleNextButtonClick}></MainWindow>
          <DisplayOptionControl className="displayOptionControl"
              value={this.state.hideOption}
              onChangeHandle={this.handleHideOptionChange}
              options={hideOptions}
          />
        </header>
      </div>
    );
  }

  handleNextButtonClick = () => {
    this.loadNextWord();
  }

  loadNextWord() {
    if (this.wordData == null) {
      // no data to load
      return;
    }
    let numData = this.wordData.length;
    if (numData < 1) {
      return;
    }
    let i = this.currentWordIndex;
    
    if (this.randomize && numData > 1) {
      // random number, must be different from current
      do {
        i = Math.floor(Math.random() * numData);
      } while (i === this.currentWordIndex)
    }
    else {
      i = (this.currentWordIndex + 1) % numData;
    }
    this.currentWordIndex = i;
      
    this.setState((state) => ({
      ...state,
      wordPinyin: this.wordData[i].pinyin,
      wordSymbol: this.wordData[i].character
    }));
  }

  // load CSV data
  loadData() {
    Papa.parse(dataFilePath, {
      download: true,
      complete: function(results) {
        console.log(results);
      }
    });
  }

  // load data from String
  loadDataText(text) {
    const results = Papa.parse(text, {
      header:true,
      skipEmptyLines:true,
    });
    if (results.errors.length > 0) {
      let rows = "";
      results.errors.forEach((e) => {
        rows = rows + (e.row+1) + ", ";
      });
      console.warn("CSV data may have errors. Please check rows: " + rows);
    }
    else {
      console.log("CSV data loaded without errors");
    }
    //console.log(results.data);
    this.wordData = results.data;

    // randomize start
    if (this.wordData.length > 0) {
      this.currentWordIndex = Math.floor(Math.random() * this.wordData.length);
    }
  }


  readDataFile() {
    // Load CSV data
    var xmlhttp = new XMLHttpRequest();
    const that = this;
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.status === 200 && xmlhttp.readyState === 4){
        const txt = xmlhttp.responseText;
        console.log("Read file:" + localDataFilePath)
        that.loadDataText(txt);
      }
    };
    
    xmlhttp.open("GET",localDataFilePath,true);
    xmlhttp.send();
  }
}



export default App;
