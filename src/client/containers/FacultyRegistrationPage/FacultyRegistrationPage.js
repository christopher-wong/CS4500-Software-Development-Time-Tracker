/* global document */
import React, { Component } from 'react';
import glamorous from 'glamorous';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

const headerBgImage = require('../../../../assets/images/scott-webb-geometric-red.jpg');

const FacultyRegistrationPageContainer = glamorous.article({
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
      fontSize: '5em',
      fontWeight: 700,
      margin: 0,
      padding: 0,
    },
    ' p': {
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

class FacultyRegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      hasAlert: false,
      alertMsg: '',
      user: false // eslint-disable-line
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
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

  handleChangeFirstName(firstName) {
    this.setState({
      firstName: firstName.target.value,
    });
  }

  handleChangeLastName(lastName) {
    this.setState({
      lastName: lastName.target.value,
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


  register() {
    if (this.state.firstName && this.state.lastName && this.state.email && this.state.password) {
      axios.post('/api/user/auth/register', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        username: this.state.email,
        password: this.state.password,
      }).then((res) => {
        if (res.data) {
          this.props.history.push('/admin'); // eslint-disable-line
        } else { // set alert message
          this.setState({ hasAlert: true, alertMsg: 'Incorrect Username/Password' });
        }
      }, () => {
        this.setState({ hasAlert: true, alertMsg: 'Incorrect Username/Password' });
      });
    }
  }

  render() {
    return (
      <FacultyRegistrationPageContainer>
        <Header id="top">
          <div className="text-vertical-center">
            <h2>Welcome, faculty member.</h2>
            <p>Enter your Northeastern email and your service learning password below to log in.</p>
            {this.state.hasAlert ? <div> {this.state.alertMsg} </div> : <div />}
            <CredentialsContainer>
              <input placeholder="First Name" value={this.state.firstName} onChange={this.handleChangeFirstName} />
              <br />
              <input placeholder="Last Name" value={this.state.lastName} onChange={this.handleChangeLastName} />
              <br />
              <input placeholder="email@email.com" type="email" value={this.state.email} onChange={this.handleChangeEmail} />
              <br />
              <input placeholder="Password" type="password" value={this.state.password} onChange={this.handleChangePassword} />
              <br />
              <div className="form-group">
                <AnchorButton onClick={this.register}>Register</AnchorButton>
                <AnchorButton href="/">Cancel</AnchorButton>
              </div>
            </CredentialsContainer>
          </div>
        </Header>
      </FacultyRegistrationPageContainer>
    );
  }
}

export default FacultyRegistrationPage;
