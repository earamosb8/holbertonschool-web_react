import React from 'react';
import { shallow } from 'chai';
import { expect } from 'enzyme';
import App from './App';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import CourseList from '../CourseList/CourseList';

describe('<App />', () => {
  it('check render without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists());
  });

  it('check render <Header /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Header)).to.have.lengthOf(1);
  });

  it('check render <Footer /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Footer)).to.have.lengthOf(1);
  });

  it('check render <Notifications /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Notifications)).to.have.lengthOf(1);
  });

  it('check that <CourseList /> is not displayed', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(CourseList)).to.have.lengthOf(0);
  });
});

describe('<App /> with `isLoggedIn=true`', () => {
  it('verify that the <Login /> component is not included', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(Login)).to.have.lengthOf(0);
  });

  it('Verify that the <CourseList /> component is included', () => {
    const wrapper = shallow(<App isLoggedIn={true} />);
    expect(wrapper.find(CourseList)).to.have.lengthOf(1);
  });
});

describe('<App /> event handlers', () => {
  it('check and verify that when the keys control and h are pressed the logOut', () => {
    const events = {};
    const logout = jest.fn();
    document.addEventListener = jest.fn((event, cb) => {
      events[event] = cb;
    });
    window.alert = jest.fn();
    shallow(<App logOut={logout} />);
    events.keydown({ key: 'h', ctrlKey: true });
    expect(window.alert).toHaveBeenCalledWith('Logging you out');
    expect(logout).toHaveBeenCalled();
    jest.restoreAllMocks();
  });
});
