import React from 'react';
import PropTypes from 'prop-types';
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import CourseList from '../CourseList/CourseList'
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import { StyleSheet, css } from 'aphrodite';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  componentDidMount() {
    window.addEventListener('keydown', this.handleLogout);
  }
  handleLogout(e) {
    if (e.ctrlKey && e.key === 'h') {
      e.preventDefault();
      alert('Logging you out');
      this.props.logOut();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleLogout);
  }

  render() {
    const { isLoggedIn } = this.props;

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ];
    
    const listNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ];

    return (
      <React.Fragment>
        <Notifications listNotifications={listNotifications} />
        <Header />
        {isLoggedIn ? (
          <BodySectionWithMarginBottom title="Course list">
             <CourseList listCourses={listCourses} />
          </BodySectionWithMarginBottom>
         ) : (
           <BodySectionWithMarginBottom title="Log in to continue">
               <Login />
           </BodySectionWithMarginBottom>
         )}
          <BodySection title="News from the School">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </BodySection>
	  <div className={css(styles.footer)}>
            <Footer />
          </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func
};

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {}
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    textAlign: 'center',
    fontStyle: 'italic',
    borderTop: 'thick solid #e0344a',
  },
});

export default App;
