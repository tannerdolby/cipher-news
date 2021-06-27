import React from 'react';
import './App.css';
import { SectionNames, NewsList, FooterSectionNames } from './News';

// Use some stateless functional components 

// const PopOver = () => {
//   return (
//     <div className="pop-over">
//       <p>Take a moment to fill out the <a href="/">reading habits survey</a> ✏️ Want to read now? <a href="/">Get Started</a> ✨</p>
//       <button className="po-exit">x</button>
//     </div>
//   )
// }

// const SearchIcon = () => {
//   return (
//     <svg version="1.1" id="search-icon" xmlns="http://www.w3.org/2000/svg" x="20" y="20"
//       viewBox="0 0 512.005 512.005" xmlSpace="preserve">
//     <g>
//       <g>
//         <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667
//           S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6
//           c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z
//           M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
//       </g>
//     </g>
//     </svg>
//   )
// }

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false,
      isLinkClicked: false,
      isViewportSmall: false,
      isViewportLarge: false
    }
    this.toggleNav = this.toggleNav.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.checkViewportWidth = this.checkViewportWidth.bind(this);
  }

  toggleNav() {
    if (this.state.isLinkClicked && !this.state.isToggled) {
      document.querySelector(".nav-links").classList.remove("hidden");
      document.querySelector(".nav-links").classList.toggle("show");
    } else {
      this.setState(prevState => ({
        isToggled: !prevState.isToggled
      }));
    }
    this.checkViewportWidth();
  }

  handleLinkClick() {
    this.setState(prevState => ({
        isLinkClicked: !prevState.isLinkClicked,
        isToggled: !prevState.isToggled
    }));
  }

  checkViewportWidth() {
    let currWidth = window.innerWidth;
    if (currWidth < 600) {
      this.setState(prevState => ({
        isViewportSmall: !prevState.isViewportSmall
      }));
    } else {
      this.setState(prevState => ({
        isViewportLarge: !prevState.isViewportLarge
      }));
    }
  }

  render() {
    return (
      <nav className="main-nav" id="main-navigation">
        <button className="hamburger-menu" onClick={this.toggleNav}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
        <ul className={`nav-links ${this.state.isToggled && this.state.isViewportSmall ? 'show' : 'hidden'}`}>
          <li key="home"><a onClick={this.state.isToggled ? this.handleLinkClick : this.checkViewportWidth} href="/">Home</a></li>
          <li key="subections"><a onClick={this.state.isToggled ? this.handleLinkClick : this.checkViewportWidth} href="#subsections">Subsections</a></li>
          <li key="contact"><a onClick={this.state.isToggled ? this.handleLinkClick : this.checkViewportWidth} href="#contact-info">Contact</a></li>
          <li key="code"><a href="https://github.com/tannerdolby/cipher-news">GitHub</a></li>
        </ul>
        <a href="#main-subscribe" className="nav-signup">Sign Up</a>
      </nav>
    )
  }
}

const Hero = () => {
  return (
    <header className="hero">
      <h1>Cipher News Top Stories</h1>
    </header>
  )
}

const SocialLinks = () => {
  const twitterIcon = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="18px" y="18px"
    viewBox="0 0 512 512">
  <path fill="#03A9F4" d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
  c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
  c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
  c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
  c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
  c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
  C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
  C480.224,136.96,497.728,118.496,512,97.248z"/>
  </svg>;
  const githubIcon = <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="35px" y="35px"
      viewBox="0 0 512 512">
    <g>
    <g>
      <path fill="#111" d="M255.968,5.329C114.624,5.329,0,120.401,0,262.353c0,113.536,73.344,209.856,175.104,243.872
        c12.8,2.368,17.472-5.568,17.472-12.384c0-6.112-0.224-22.272-0.352-43.712c-71.2,15.52-86.24-34.464-86.24-34.464
        c-11.616-29.696-28.416-37.6-28.416-37.6c-23.264-15.936,1.728-15.616,1.728-15.616c25.696,1.824,39.2,26.496,39.2,26.496
        c22.848,39.264,59.936,27.936,74.528,21.344c2.304-16.608,8.928-27.936,16.256-34.368
        c-56.832-6.496-116.608-28.544-116.608-127.008c0-28.064,9.984-51.008,26.368-68.992c-2.656-6.496-11.424-32.64,2.496-68
        c0,0,21.504-6.912,70.4,26.336c20.416-5.696,42.304-8.544,64.096-8.64c21.728,0.128,43.648,2.944,64.096,8.672
        c48.864-33.248,70.336-26.336,70.336-26.336c13.952,35.392,5.184,61.504,2.56,68c16.416,17.984,26.304,40.928,26.304,68.992
        c0,98.72-59.84,120.448-116.864,126.816c9.184,7.936,17.376,23.616,17.376,47.584c0,34.368-0.32,62.08-0.32,70.496
        c0,6.88,4.608,14.88,17.6,12.352C438.72,472.145,512,375.857,512,262.353C512,120.401,397.376,5.329,255.968,5.329z"/>
    </g>
    </g>
    </svg>;

  const obj = {
    github: {
      url: "https://github.com/tannerdolby",
      icon: twitterIcon
    },
    twitter: {
      url: "https://twitter.com/tannerdolby",
      icon: githubIcon
    }
  };

  const listItems = Object.keys(obj).map(link => {
    return (
      <li className="social-link" key={obj[link].url}>
        <a href={obj[link].url}>
          {obj[link].icon}
        </a>
      </li>
    )
  });

  return (
    <div>
      <ul className="social-list">
        {listItems}
      </ul>
    </div>
  )
}

// import sections && subsections from News.tsx
const Footer = () => {
  return (
    <footer>
      <div className="footer-row">
        <div className="footer-about" id="contact-info">
          <div className="footer-logo">
            <div>
              CNG
            </div>
            <p>Cipher News Group</p>
          </div>
          <p>Our team is committed to delivering up-to-date news 24/7 provided by the New York Times Top Stories API. Stay connected with the most recent top stories and keep yourself informed. Find us on social media below!</p>
          <SocialLinks />
        </div>
        <div className="footer-nav">
          <strong>Sections</strong>
          <FooterSectionNames />
        </div>
      </div>
      <div className="footer-fold">
        <p>Built by Tanner Dolby. News provided by the <a href="https://developer.nytimes.com/docs/top-stories-product/1/overview">New York Times</a></p>
        <a href="#main-navigation">Back to top</a>
      </div>
    </footer>
  )
}

const App = () => {
  return (
    <div className="app">
      <NavBar />
      {/* <Time /> */}
      <Hero />
      <SectionNames />
      {/* List of sections */}
      <NewsList />
      <Footer />
    </div>
  )
}

export default App;
