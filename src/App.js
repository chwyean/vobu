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
      hideOption:"symbol"
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
    console.log("text:\n" + text)
    // const results = Papa.parse(text, {
    //   header:true
    // });
    // console.log(results);
  }

  printHello() {
    console.log("hello");
  }

  readDataFile() {
    var xmlhttp = new XMLHttpRequest();
    const that = this;
    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.status === 200 && xmlhttp.readyState === 4){
        const txt = xmlhttp.responseText;
        console.log("Read file:" + localDataFilePath)

        that.printHello();
        that.loadDataText(txt);
      }
    };
    
    //xmlhttp.open("GET","vocab-raw.csv",true);
    xmlhttp.open("GET",localDataFilePath,true);
    xmlhttp.send();
  }
}



export default App;
