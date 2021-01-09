import React from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayOptionControl from './DisplayOptionControl'
import MainWindow from './MainWindow';

//import Papa from './PapaParse/papaparse';
import Papa from 'papaparse';


const hideOptions = {
  "symbol":"symbol",
  "pinyin":"pinyin",
  "none":"none"
};

const dataFilePath = 'vocab-raw-test.csv';
const localDataFilePath = 'vocab-raw-test.csv';

class App extends React.Component {

  wordData=null;

  constructor(props){
    super(props)
    this.state = {
      randomized:true,
      hideOption:"symbol",
      currentWordIndex: -1,
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
          <p>Chosen value: {hideOptions[this.state.hideOption]}</p>
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
    let i = this.state.currentWordIndex;
    
    if (this.state.randomized && numData > 1) {
      // random number, must be different from current
      do {
        i = Math.floor(Math.random() * numData);
      } while (i === this.state.currentWordIndex)
      console.log(i)
    }
    else {
      i = (this.state.currentWordIndex + 1) % numData;
    }
      
    this.setState((state) => ({
      ...state,
      currentWordIndex: i,
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
    console.log(results.data);
    this.wordData = results.data;
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
