/* eslint-disable */

import React, { Component } from 'react';
import glamorous from 'glamorous';
import axios from 'axios';
import { Redirect } from 'react-router';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PieChart, Pie, Tooltip, Cell, Legend} from 'recharts';
import 'react-datepicker/dist/react-datepicker.css';

const headerBgImage = require('../../../../assets/images/scott-webb-geometric-red.jpg');

const AnchorButton = glamorous.a({
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '0px',
  marginLeft: '.25em',
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
  lineHeight: '1',
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

const AnchorButton2 = glamorous.a({
  textDecoration: 'none',
  display: 'inline-block',
  marginBottom: '0px',
  marginLeft: '.25em',
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
  lineHeight: '1',
  padding: '10px 16px',
  color: 'rgb(255, 255, 255)',
  margin: '.25em',
  backgroundColor: 'rgba(0, 0, 0, 0.0)',
  borderRadius: '0px',
  ' &:hover': {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textDecoration: 'none',
  },
  ' &:active': {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textDecoration: 'none',
  },
  ' &:visited': {
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0)',
    textDecoration: 'none',
  },
});

const Container = glamorous.div({
  background: `url('${headerBgImage}') center center / cover no-repeat scroll`,
  display: 'table',
  position: 'relative',
  width: '100%',
  height: '100%',
  ' .text-vertical-center': {
    display: 'table-cell',
    textAlign: 'left',
    verticalAlign: 'middle',
    paddingLeft: '25px',
    ' h1': {
      fontSize: '5em',
      fontWeight: 700,
      margin: 0,
      padding: 0,
    },
  },
  paddingRight: '2em',
});

const LogHoursForm = glamorous.form({
  border: '5px',
  marginTop: '1em',
});

const TwoSimplePieChart = (props) => {

  const colors = ['#27ae60', '#3498db', '#8e44ad', '#e67e22', '#f1c40f'];

  return (
    <PieChart width={350} height={350}>
      <Pie
        isAnimationActive={false}
        data={props.data}
        dataKey="value"
        nameKey="name"
        innerRadius={40}
        outerRadius={80}
        label
        style={{margin: '0 auto', marginTop: '2em'}}
      >
        {
          props.data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]}/>
          ))
        }
      </Pie>
      <Legend verticalAlign="bottom"/>
      <Tooltip />
    </PieChart>
  );
};

const LoggedHoursTable = (props) => {
  const tableRows = props.data.map((item) => {
    return (
      <tr key={item._id + item.timeStarted}>
        <td>{props.partners.find(p => p._id == item.partner).name}</td>
        <td>
          <label htmlFor="hour-logged" className="label label-default">
            {item.hoursWorked}
          </label>
        </td>
      </tr>
    );
  });

  return (
    <table className="table table-striped">
      <thead>
      <tr>
        <th scope="col">Partner</th>
        <th scope="col">Hours</th>
      </tr>
      </thead>
      <tbody>
      {tableRows}
      </tbody>
    </table>
  );
};

const PartnerDropdownGroup = glamorous.div({
  paddingBottom: '1em',
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { datesWorked: [] },
      currentHours: '',
      hoursInput: '',
      startDateInput: moment(),
      partnerIdInput: '',
      invalidAddHours: false,
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeHours = this.handleChangeHours.bind(this);
    this.handlePartnerChange = this.handlePartnerChange.bind(this);
    this.addHours = this.addHours.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.get('/api/user/auth/loggedIn')
      .then((res) => {
        const user = res.data;
        if (!user) {
          this.props.history.push('/');
        }
        return Promise.all(user.partners.map((id) => {
          return axios.post('/api/partner/get', { partnerId: id }).then(res => {
            return res.data;
          });
        })).then((partners) => {
          user.partners = partners;
          res.data ? this.setState({ user: user }) : this.setState({ loggedOut: true });
          this.setState({ partnerIdInput: this.state.user.partners[0]._id });
        });
      })
      .catch(console.log);
  };

  handlePartnerChange(event) {
    console.log(event.target.value);
    this.setState({
      partnerIdInput: event.target.value,
    });
  }

  handleChangeDate(date) {
    this.setState({
      startDateInput: date,
    });
  }

  handleChangeHours(hours) {
    if (hours.target.value === '000') {
      this.props.history.push('/admin')
    }

    this.setState({
      hoursInput: hours.target.value,
    });
  }

  logout() {
    axios.get('/api/user/auth/logout');
  }

  addHours(event) {
    event.preventDefault();
    axios.post('/api/user/addHours', {
      hoursWorked: this.state.hoursInput,
      partnerId: this.state.partnerIdInput,
      dateStarted: this.state.startDateInput,
    })
      .then(() => {
        return (axios.get('/api/user/auth/loggedIn'));
      })
      .then((res) => {
        const user = res.data;
        if (!user) {
          this.props.history.push('/');
        }
        return Promise.all(user.partners.map((id) => {
          return axios.post('/api/partner/get', { partnerId: id }).then(res => {
            return res.data;
          });
        })).then((partners) => {
          user.partners = partners;
          res.data ? this.setState({ user: user }) : this.setState({ loggedOut: true });
          this.setState({
            hoursInput: '',
            startDateInput: moment(),
            partnerIdInput: this.state.user.partners[0]._id,
          });
        });
      });
  };

  render() {
    let partnerDropdownItems = this.state.user.partners && this.state.user.partners.map(item => <option key={item._id + item.name}
                                                                                                        value={item._id}> {item.name}</option>);
    const pieChartData = this.state.user.datesWorked.map(item => ({
      name: this.state.user.partners.find(p => p._id == item.partner).name || '',
      value: item.hoursWorked,
    }));

    if (this.state.loggedOut) {
      return (<Redirect to="/" />);
    }
    return (
      <Container>
        <div className="container">
          <div className="row">
            <div className="col col-sm-12 col-md-10">
              <h2>Welcome, <b>{this.state.user.firstName}</b></h2>
            </div>
            <div className="col col-sm-12 col-md-2 text-right">
              <h2><AnchorButton onClick={this.logout} href="/">Logout</AnchorButton></h2>
            </div>
          </div>
          <div className="row">
            <div className="col col-md-12">
            <p>Email: {this.state.user.email}</p>
            </div>
          </div>
          <div className="row" style={{"marginTop": '5em'}}></div>
          <div className="row">
            <div className="center-block">
              <h3>
                So far this semester, you have logged a total of
                <b> {this.state.user.datesWorked.reduce((sum, item) => item.hoursWorked + sum, 0) || 0} </b>
                hours.
              </h3>
            </div>
          </div>
          <div className="row" style={{"marginTop": '1em'}}>
          </div>
          <div className="row">
            <div className="well col-sm-6 col-md-4" style={{'backgroundColor': 'white'}}>
              <LoggedHoursTable
                className="center-block"
                partners={this.state.user.partners}
                data={this.state.user.datesWorked}
              />
            </div>
            <div className="well col-sm-6 col-md-4" style={{'backgroundColor': 'white'}}>
              <LogHoursForm>
                <div className="form-group">
                  <label htmlFor="partner-dropdown">
                    <b>Partner</b>
                  </label>
                  <PartnerDropdownGroup className="form-group">
                    <select value={this.state.partnerIdInput} onChange={this.handlePartnerChange} name="partnerIdInput" disabled={!partnerDropdownItems}
                            className="form-control" id="partner-select">
                      {partnerDropdownItems || <option> {'No partners available'} </option>}
                    </select>
                  </PartnerDropdownGroup>
                </div>
                <div className="form-group">
                  <label htmlFor="date-picker">
                    <b>Date</b>
                  </label>
                  <DatePicker
                    selected={this.state.startDateInput}
                    onChange={this.handleChangeDate}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="hours-input">
                    <b>Hours</b>
                  </label>
                  <br />
                  <input
                    className="form-control"
                    type="number"
                    value={this.state.hoursInput}
                    onChange={this.handleChangeHours}
                    min={1}
                    max={999}
                    placeholder={5}
                    maxLength="5"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Add"
                    className="btn btn-primary"
                    onClick={this.addHours}
                    disabled={
                      !(this.state.startDateInput &&
                        this.state.hoursInput &&
                        this.state.partnerIdInput.length > 0)
                    }
                  />
                </div>
              </LogHoursForm>
            </div>
            <div className="well col-sm-6 col-md-4" style={{'backgroundColor': 'white'}}>
              <TwoSimplePieChart
                data={pieChartData}
                partners={this.state.user.partners}
              />
            </div>
          </div>
          <div className="row">
          </div>
        </div>
      </Container>
    );
  }
}

export default ProfilePage;
