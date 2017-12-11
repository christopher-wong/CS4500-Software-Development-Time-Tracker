/* eslint-disable no-unused-vars,react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */

import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const Container = glamorous.article({
  width: '100%',
  height: '100%',
  padding: '1em',
  paddingTop: '4em',
});

const Header = glamorous.header({
  height: 40,
  color: '#000000',
  backgroundColor: '#000000',
  boxShadow: 'none',
  padding: '0 20px',
  position: 'fixed',
  width: '100%',
  zIndex: 100,
  top: 0,
  left: 0,
  ' h1': {
    fontSize: 16,
    margin: 10,
    textAlign: 'left',
  },
});

const CourseLink = glamorous.a({
  fontWeight: 'normal',
  '&:hover': {
    textDecoration: 'underline',
    color: '#00284d',
  },
});

const DownloadContainer = glamorous.form({
  textAlign: 'center',
});

const lineData = [
  {
    name: 'Monday', spring: 400, fall: 240, amt: 240,
  },
  {
    name: 'Tuesday', spring: 300, fall: 139, amt: 221,
  },
  {
    name: 'Wednesday', spring: 200, fall: 980, amt: 220,
  },
  {
    name: 'Thursday', spring: 278, fall: 390, amt: 200,
  },
  {
    name: 'Friday', spring: 189, fall: 480, amt: 218,
  },
  {
    name: 'Saturday', spring: 239, fall: 380, amt: 250,
  },
  {
    name: 'Sunday', spring: 349, fall: 430, amt: 210,
  },
];

const radarData = [
  {
    subject: 'COE', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'CAMD', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'D’Amore-McKim', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'CCIS', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'Bouve', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'CPS', A: 65, B: 85, fullMark: 150,
  },
];

const SimpleLineChart = () => {
  return (
    <LineChart
      width={600}
      height={300}
      data={lineData}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="fall" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="spring" stroke="#82ca9d" />
    </LineChart>
  );
};

const coursesData = [
  {
    name: 'CS 2510',
    crn: '937465',
  },
  {
    name: 'ENGW 1155',
    crn: '164982',
  },
  {
    name: 'CAMD 3425',
    crn: '103947',
  },
  {
    name: 'PHYS 1157',
    crn: '354678',
  },
  {
    name: 'CHEM 1147',
    crn: '946294',
  },
];

const CoursesTable = (props) => {
  const tableRows = props.data.map((item) => {
    return (
      <tr key={item.name + item.crn}>
        <td><CourseLink>{item.name}</CourseLink></td>
        <td>{item.crn}</td>
        <td>
          <button className="btn btn-danger btn-xs pull-right">
            <i className="fa fa-times">&nbsp;</i>Delete Course
          </button>
          <button className="btn btn-primary btn-xs pull-right" style={{ marginRight: '1em' }} disabled>
            <i className="fa fa-pencil">&nbsp;</i>Edit
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Course Name</th>
          <th scope="col">CRN</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
};

CoursesTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    crn: PropTypes.string,
  })).isRequired,
};

const partnersData = [
  {
    name: 'Burundi Friends International',
    email: 'jane@foundation.org',
  },
  {
    name: 'Boston Housing Authority',
    email: 'mike@bha.edu',
  },
];

const PartnerTable = (props) => {
  const tableRows = props.data.map((item) => {
    return (
      <tr key={item.name + item.email}>
        <td><CourseLink>{item.name}</CourseLink></td>
        <td>{item.email}</td>
        <td>
          <button className="btn btn-danger btn-xs pull-right">
            <i className="fa fa-times">&nbsp;</i>Delete Course
          </button>
          <button className="btn btn-primary btn-xs pull-right" style={{ marginRight: '1em' }} disabled>
            <i className="fa fa-pencil">&nbsp;</i>Edit
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Partner Name</th>
          <th scope="col">Contact</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
  );
};

PartnerTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })).isRequired,
};

const TwoLevelPieChart = () => {
  return (
    <RadarChart cx={300} cy={250} outerRadius={90} width={600} height={500} data={radarData}>
      <Radar name="2016" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      <Radar name="2017" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      <PolarGrid />
      <Legend />
      <PolarAngleAxis dataKey="subject" />
      <PolarRadiusAxis angle={30} domain={[0, 150]} />
    </RadarChart>
  );
};

const HomeLink = glamorous.h1({
  textDecoration: false,
  color: '#FFFFFF',
  fontWeight: 'bold',
});

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}, // eslint-disable-line
      users: [],
      professors: [],
      partnerNameInput: '',
      partnerEmailInput: '',
      courseNameInput: '',
      profNameInput: '',
      modifyUserRoleIdInput: '',
      classes: [],
      partners: [],
    };
    this.handlePartnerChange = this.handlePartnerChange.bind(this);
    this.addPartner = this.addPartner.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.addClass = this.addClass.bind(this);
    this.handleModifyRole = this.handleModifyRole.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    //
    axios.get('/api/user/auth/loggedIn')
      .then((res) => {
        if (res.data) {
          const user = res.data;
          // User is logged in as an Admin.
          this.setState({ user });  // eslint-disable-line
          if (user.roles.includes('ADMIN')) {
            axios.get('/api/user/getAllUsers')
              .then((res4) => {
                res4.data && this.setState({ users: res4.data.users });
                return axios.get('/api/user/getProfessors');
              })
              .then((res2) => {
                res2.data && this.setState({ professors: res2.data.professors });
                return axios.get('/api/class/all');
              })
              .then((res3) => {
                res3.data && this.setState({ classes: res3.data });
                return axios.get('/api/partner/all');
              })
              .then((res4) => {
                res4.data && this.setState({ partners: res4.data });
              })
              .catch();
          } else {
            this.props.history.push('/facultyLogin');
          }
        } else {
          this.props.history.push('/facultyLogin');
        }
      }, () => {
        this.props.history.push('/facultyLogin');
        // error
      });
  }

  addPartner(event) { // eslint-disable-line
    axios.post('/api/partner/', {
      name: this.state.partnerNameInput,
      email: this.state.partnerEmailInput,
    }).then(() => {
      return axios.get('/api/partner/all');
    })
      .then((res3) => {
        res3.data && this.setState({ partners: res3.data, partnerNameInput: '', partnerEmailInput: '' });
      });
    event.preventDefault();
  }

  handlePartnerChange(event) {
    const target = event.target; // eslint-disable-line prefer-destructuring

    this.setState({
      [target.name]: target.value,
    });
  }

  addClass(event) { // eslint-disable-line
    // alert(`${this.state.courseNameInput} + ${this.state.profNameInput}`);
    event.preventDefault();
  }

  handleClassChange(event) {
    const target = event.target; // eslint-disable-line prefer-destructuring

    this.setState({
      [target.name]: target.value,
    });
  }

  logout() { // eslint-disable-line
    axios.get('/api/user/auth/logout');
  }

  handleModifyRole(event) {
    const target = event.target; // eslint-disable-line prefer-destructuring

    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const userList = this.state.users.map((user) => {
      return (
        <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
      );
    });

    const professorList = this.state.professors.map((prof) => {
      return (
        <option key={prof.id} value={prof.id}>{`${prof.firstName} ${prof.lastName}`}</option>
      );
    });

    const roleCheckboxes = this.state.users.map((user) => { // eslint-disable-line
      if (user.id === this.state.modifyUserRoleIdInput) {
        const { roles } = user;
        const studentChecked = roles.indexOf('STUDENT') >= 0;
        const taChecked = roles.indexOf('TA') >= 0;
        const profChecked = roles.indexOf('PROFESSOR') >= 0;
        const adminChecked = roles.indexOf('ADMIN') >= 0;
        return (
          <div className="col" key={user.id}>
            <label className="checkbox-inline">
              <input type="checkbox" value="STUDENT" checked={studentChecked} />
              Student
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" value="TA" checked={taChecked} />
              Teaching Assistant
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" value="PROFESSOR" checked={profChecked} />
              Professor
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" value="ADMIN" checked={adminChecked} />
              Administrator
            </label>
          </div>
        );
      }
    });

    return (
      <Container className="container-table">
        <Header>
          <div className="row middle-xs">
            <div className="col-xs-10 row">
              <HomeLink>
                Service-Learning Dashboard
              </HomeLink>
            </div>
            <div className="col-xs-2 text-right">
              <HomeLink>
                <a href="/" onClick={this.logout}>Logout</a>
              </HomeLink>
            </div>
          </div>
        </Header>
        <div className="row">
          <div className="well center-block">
            <DownloadContainer>
              <div className="form-group">
                <label htmlFor="export-text">
                  Download application data as CSV
                </label>
              </div>
              <button
                className="btn btn-primary"
                formAction="../../../file_archive/Examples/Admin_export.xlsx"
                download
              >
                Export
              </button>
            </DownloadContainer>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12">
            <CoursesTable data={this.state.classes} />
            <PartnerTable data={this.state.partners} />
          </div>
        </div>
        <div className="row" style={{ paddingBottom: '2.5em' }}>
          <div className="col-sm-4 center-block">
            <form>
              <label><h3>Add Partner</h3></label>
              <div className="form-group">
                <label htmlFor="Class">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="partnerNameInput"
                  placeholder="Northeastern University"
                  value={this.state.partnerNameInput}
                  onChange={this.handlePartnerChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="partnerEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="partnerEmailInput"
                  placeholder="jane@northeastern.edu"
                  value={this.state.partnerEmailInput}
                  onChange={this.handlePartnerChange}
                />
                <small id="emailHelp" className="form-text text-muted">Used for contact only.</small>
              </div>
              <input
                type="submit"
                value="Add"
                className="btn btn-primary"
                onClick={this.addPartner}
                disabled={!(this.state.partnerEmailInput.length > 0 &&
                  this.state.partnerNameInput.length > 0)}
              />
            </form>
          </div>
          <div className="col-sm-4 center-block">
            <form>
              <label><h3>Add Class</h3></label>
              <div className="form-group">
                <label htmlFor="courseNameInput">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseNameInput"
                  value={this.state.courseNameInput}
                  placeholder="CS 6240"
                  onChange={this.handleClassChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Class">Professor</label>
                <select
                  className="form-control"
                  name="profNameInput"
                  value={this.state.profNameInput}
                  disabled={!professorList}
                  onChange={this.handleClassChange}
                >
                  {professorList || <option> {'No professors available'} </option>}
                </select>
                <small>&nbsp;</small>
              </div>
              <input
                type="submit"
                value="Add"
                className="btn btn-primary"
                onClick={this.addClass}
                disabled={!(this.state.courseNameInput.length > 0 &&
                  this.state.profNameInput.length > 0)}
              />
            </form>
          </div>
          <div className="col-sm-4 center-block">
            <form>
              <label><h3>Modify User Role</h3></label>
              <div className="form-group">
                <label htmlFor="Class">User</label>
                <select
                  className="form-control"
                  name="modifyUserRoleIdInput"
                  value={this.state.modifyUserRoleIdInput}
                  disabled={!userList}
                  onChange={this.handleModifyRole}
                >
                  {userList || <option> {'No users available'} </option>}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="Class">Role</label>
                {roleCheckboxes}
              </div>
            </form>
            <input
              type="submit"
              value="Update"
              className="btn btn-danger"
              onClick={this.handleModifyRole}
              disabled={!(this.state.modifyUserRoleIdInput.length > 0)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col center-block">
            {/* <SimpleLineChart /> */}
          </div>
        </div>
        <div className="row">
          <div className="center-block">
            {/* <TwoLevelPieChart /> */}
          </div>
        </div>
      </Container>
    );
  }
}

export default AdminDashboard;
