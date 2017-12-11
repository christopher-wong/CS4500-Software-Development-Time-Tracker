import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from './containers/HomePage/HomePage';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import AdminDashboard from './containers/AdminDashboard/AdminDashboard';
import '../../assets/font-awesome/font-awesome.scss';
import './index.scss';
import FacultyLoginPage from './containers/FacultyLoginPage/FacultyLoginPage';
import FacultyRegistrationPage from './containers/FacultyRegistrationPage/FacultyRegistrationPage';

render(
  <BrowserRouter>
    <span>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/profile" component={ProfilePage} />
      <Route exact path="/admin" component={AdminDashboard} />
      <Route exact path="/facultyLogin" component={FacultyLoginPage} />
      <Route exact path="/facultyRegister" component={FacultyRegistrationPage} />
    </span>
  </BrowserRouter>,
  document.getElementById('root'),
);
