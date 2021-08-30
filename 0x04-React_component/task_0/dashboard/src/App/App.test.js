import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists());
  });

  it('should render <Header /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).to.have.lengthOf(1);
  });

  it('should render <Footer /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).to.have.lengthOf(1);
  });

  it('should render <Notifications /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).to.have.lengthOf(1);
  });

  it('should check that <CourseList /> is not displayed', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList)).to.have.lengthOf(0);
  });
});

describe('<App /> with `isLoggedIn=true`', () => {
  it('should verify that the <Login /> component is not included', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(Login)).to.have.lengthOf(0);
  });

  it('should verify that the <CourseList /> component is included', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList)).to.have.lengthOf(1);
  });
});
