import React from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';

const cheerio = require('cheerio');

//health > https://www.news.com.au/lifestyle/health
//business > https://www.news.com.au/finance/business/breaking-news

function App() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header-background text-white row py-2">
      <h2 className="col text-left ml-3">home-icon</h2>
      <h2 className="col text-right mr-3">menu items</h2>
    </div>
  )
}

function Footer() {
  return (
    <div className="text-center py-2">Built with &#9829; by LK</div>
  )
}

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }

  componentDidMount() {
    fetch("https://cors-anywhere.herokuapp.com/https://www.news.com.au/national/nsw-act/news")
    .then(response => response.text())
    .then(response => { this.setState({data: response})
    });
    
  }

  render() {
    let article_headings = [];
    let article_images = [];
    let article_hrefs = [];
    let article_blurbs = [];

    const $ = cheerio.load(this.state.data);

    // article headings
    $('.heading').map((i,e) => { 
      article_headings.push($(e).text());
    })

    // article images
    $('.story-block  > a > img').map((i,e) => { 
      article_images.push($(e).attr('src'));
    })

    // article links - remove dupes
    $('.heading  > a').map((i,e) => { 
      article_hrefs.push($(e).attr('href'));
    })

    // article blurbs -- to fix
    $('.story-block > p > span').map((i,e) => { 
      // console.log($(e).text())
      article_blurbs.push($(e).text());
    })

    return (
      article_headings.length === 0 ? 
      <div className="container text-center">
        <h1 className="my-3">News of the Day</h1>
        <h2 className="my-3">Loading...</h2>
        <div className="spinner-border text-primary" role="status">
        </div>
      </div>
      : 
      <div className="container">
        <h1 className="text-center my-3">News of the Day</h1>
        <ul> { 
          article_headings.map((e,i) => <li key={i} className="font-weight-bold article-heading">{e}</li>
        )}
        </ul>
      </div>
    )
  }
}

export default App;
