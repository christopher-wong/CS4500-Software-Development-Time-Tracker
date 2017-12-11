import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard container', () => {
  it('should render AdminDashboard container', () => {
    const wrapper = shallow(<AdminDashboard />);
    expect(wrapper.find('div').length).to.equal(22);
    expect(wrapper.find('label').length).to.equal(10);
    expect(wrapper.find('button').length).to.equal(1);
  });
});
