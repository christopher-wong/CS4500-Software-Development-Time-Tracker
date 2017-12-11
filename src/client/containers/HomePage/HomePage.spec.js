import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import HomePage from './HomePage';

describe('HomePage container', () => {
  it('should render HomePage container', () => {
    const wrapper = shallow(<HomePage />);
    expect(wrapper.find('h1').length).to.equal(1);
    expect(wrapper.find('h3').length).to.equal(1);
    expect(wrapper.find('div').length).to.equal(1);
  });
});
