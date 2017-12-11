import React, { Component } from 'react';
import glamorous from 'glamorous';

const headerBgImage = require('../../../../assets/images/scott-webb-geometric-red.jpg');

const HomePageContainer = glamorous.article({
  width: '100%',
  height: '100%',
});

const Header = glamorous.header({
  display: 'table',
  position: 'relative',
  width: '100%',
  height: '100%',
  background: `url('${headerBgImage}') center center / cover no-repeat scroll`,
  ' .text-vertical-center': {
    display: 'table-cell',
    textAlign: 'center',
    verticalAlign: 'middle',
    ' h1': {
      fontSize: '4.5em',
      fontWeight: 700,
      margin: 0,
      padding: 0,
    },
  },
});

const AnchorButton = glamorous.a({
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '0px',
  fontWeight: '400',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle',
  touchAction: 'manipulation',
  cursor: 'pointer',
  userSelect: 'none',
  backgroundImage: 'none',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'transparent',
  borderImage: 'initial',
  fontSize: '18px',
  lineHeight: '1.33333',
  padding: '10px 16px',
  color: 'rgb(255, 255, 255)',
  margin: '.25em',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  borderRadius: '0px',
  ' &:hover': {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
    textDecoration: 'none',
  },
  ' &:active': {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
    textDecoration: 'none',
  },
  ' &:visited': {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.7)',
    textDecoration: 'none',
  },
});

class HomePage extends Component {
  componentWillMount() {
    document.title = 'Service-Learning Time Tracking';
  }

  render() {
    return (
      <HomePageContainer>
        <Header id="top">
          <div className="text-vertical-center" >
            <h1>Service-Learning Time Tracking</h1>
            <h3>A Northeastern University Application</h3>
            <br />
            <AnchorButton
              href="/api/user/auth/student"
            >{'Student'}
            </AnchorButton>
            <AnchorButton
              href="/facultyLogin"
            >{'Faculty'}
            </AnchorButton>
          </div>
        </Header>
      </HomePageContainer>
    );
  }
}

export default HomePage;
