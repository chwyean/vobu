import React from 'react';
import './App.css';
import DisplayOptionControl from './DisplayOptionControl'
import MainWindow from './MainWindow';

import Papa from 'papaparse';

const hidingString = "???";

const hideOptions = {
  "none":"none",
  "symbol":"symbol",
  "pinyin":"pinyin",
};

/* 
Button mode based on value of isHiding.
*/
const buttonModes = {
  false:"Next",
  true:"Show",
};

const dataFilePath = './vocab-raw.csv';
//const dataFilePath = './vocab-raw-test.csv';

class App extends React.Component {

  wordData=null;
  currentWordIndex = -1;
  randomize = true;
  isHiding = false;

  constructor(props){
    super(props)
    this.state = {
      hideOption:"none",
      buttonMode:"next",
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
              buttonMode={buttonModes[this.isHiding]}
              mainButtonHandler={this.handleMainButtonClick}></MainWindow>
          <DisplayOptionControl className="displayOptionControl"
              value={this.state.hideOption}
              onChangeHandle={this.handleHideOptionChange}
              options={hideOptions}
          />
        </header>
      </div>
    );
  }

  handleMainButtonClick = () => {
    if (this.state.hideOption === "none") {
      this.isHiding = false;
      this.loadNextWord();
    }
    else if (this.isHiding === false) {
      this.isHiding = true;
      this.loadNextWord();
    }
    else {
      this.isHiding = false;
    }
    this.showWord();
  }

  showWord() {
    if (this.currentWordIndex < 0 || this.wordData === null) return;
    let word = this.filterWord(this.wordData[this.currentWordIndex]);

    this.setState((state) => ({
      ...state,
      wordPinyin: word.pinyin,
      wordSymbol: word.character
    }));
  }

  filterWord(word) {
    if (this.isHiding === false) {
      return word;
    }
    return {
      pinyin: (this.state.hideOption === "pinyin")? hidingString : word.pinyin,
      character: (this.state.hideOption === "symbol")? hidingString : word.character,
    }
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
    //console.log(this.wordData[i]);
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
        console.log("Read file:" + dataFilePath)
        that.loadDataText(txt);
      }
    };
    
    //xmlhttp.open("GET",localDataFilePath,true);
    xmlhttp.open("GET",dataFilePath,true);
    xmlhttp.send();
  }
}

export default App;
