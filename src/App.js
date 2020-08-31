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
      data: '',
      article_headings: [],
    }
  }

  componentDidMount() {
    fetch("https://cors-anywhere.herokuapp.com/https://www.news.com.au/national/nsw-act/news")
    .then(response => response.text())
    .then(response => { this.setState({data: response})
    });
    
  }

  render() {
    let arr = this.state.article_headings;
    const $ = cheerio.load(this.state.data);
    $('h4.heading').map((i,e) => { 
      arr.push($(e).text());
      console.log($(e).text()) })
    return(
      <div>
        {this.state.article_headings}
      </div>
    )
  }
}

export default App;
