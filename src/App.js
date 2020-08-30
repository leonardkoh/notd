import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

const cheerio = require('cheerio');

let url = "https://www.abc.net.au/news/justin/";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Content />
      </header>
    </div>
  );
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  componentDidMount() {
    fetch("https://cors-anywhere.herokuapp.com/https://www.abc.net.au/news/justin/")
    .then(response => response.text())
    .then(response => { this.setState({data: response})
    });
  }

  render() {
 
    console.log(this.state.data)
    return(
      <div>
        {this.state.data}
      </div>
    )
  }
}

export default App;
