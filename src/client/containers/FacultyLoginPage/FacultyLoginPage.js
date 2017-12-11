/* global document */
import React, { Component } from 'react';
import glamorous from 'glamorous';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

const headerBgImage = require('../../../../assets/images/scott-webb-geometric-red.jpg');

const FacultyLoginPageContainer = glamorous.article({
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
    paddingLeft: '25px',
    ' h1': {
      fontSize: '5.75em',
      fontWeight: 700,
      margin: 0,
      padding: 0,
    },
    ' p ': {
      fontSize: '1em',
      fontWeight: 600,
    },
  },
});

const AnchorButton = glamorous.a({
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '0px',
  marginRight: '.25em',
  marginTop: '.5em',
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
  fontSize: '16px',
  lineHeight: '1',
  padding: '8px 12px',
  color: 'rgb(255, 255, 255)',
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

const CredentialsContainer = glamorous.div({
  border: '5px',
});

class FacultyLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hasAlert: false,
      alertMsg: '',
      user: false, // eslint-disable-line
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    document.title = 'Faculty Login';
    axios.get('/api/user/auth/loggedIn')
      .then((res) => {
        if (res.data) {
          this.setState({ user: res.data }); // eslint-disable-line
        } else {
          this.setState({ user: false }); // eslint-disable-line
        }
      }, () => {
        // error
      });
  }

  handleChangeEmail(email) {
    this.setState({
      email: email.target.value,
    });
  }

  handleChangePassword(password) {
    this.setState({
      password: password.target.value,
    });
  }

  login() {
    if (this.state.email && this.state.password) {
      axios.post('/api/user/auth/loginFaculty', { username: this.state.email, password: this.state.password })
        .then((res) => {
          if (res.data) {
            this.setState({ user: res.data }); // eslint-disable-line
            this.props.history.push('/admin'); // eslint-disable-line
          } else { // set alert message
            this.setState({ hasAlert: true, alertMsg: 'Incorrect Username/Password' });
          }
        }, () => {
          this.setState({ hasAlert: true, alertMsg: 'Incorrect Username/Password' });
        });
    }
  }

  register() {
    this.props.history.push('/facultyRegister');
  }

  render() {
    return (
      <FacultyLoginPageContainer>
        <Header id="top">
          <div className="text-vertical-center">
            <h2>Welcome, faculty member.</h2>
            <p>Enter your Northeastern email and
              <br />
              your service learning password below to log in.
            </p>
            {this.state.hasAlert ? <div> {this.state.alertMsg} </div> : <div />}
            <CredentialsContainer>
              <form>
                <div className="row">
                  <div className="center-block col col-md-6">
                    <input
                      className="form-control"
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChangeEmail}
                      placeholder="email"
                    />
                    <input
                      className="form-control"
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChangePassword}
                      placeholder="password"
                    />
                  </div>
                </div>
              </form>
              <AnchorButton onClick={this.login}>Login</AnchorButton>
              <AnchorButton onClick={this.register}>Register</AnchorButton>
            </CredentialsContainer>
          </div>
        </Header>
      </FacultyLoginPageContainer>
    );
  }
}

export default FacultyLoginPage;
