import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import imgClose from '../assets/close-icon.png';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import { StyleSheet, css } from 'aphrodite';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.listNotifications.length > this.props.listNotifications.length
    );
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    const show = css(displayDrawer ? styles.showOff : styles.showOn);
    return (
      <Fragment>
        <div className={css(styles.menuItem)}>
          <p className={show}>Your notifications</p>
        </div>
        {displayDrawer && (
          <div className={css(styles.notifications)}>
            <p>Here is the list of notifications</p>
            <ul>
              {listNotifications.length === 0 && (
                <NotificationItem value='No new notification for now' />
              )}
              {listNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  html={notification.html}
                  markAsRead={this.markAsRead}
                />
              ))}
            </ul>
            <button
              type='button'
              aria-label='Close'
              onClick={() => console.log('Close button has been clicked')}
              style={{
                display: 'inline-block',
                position: 'absolute',
                top: '56px',
                right: '16px',
                background: 0,
                border: 0,
                outline: 'none',
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              <img
                src={imgClose}
                alt=''
                style={{ width: '8px', height: '8px' }}
              />
            </button>
          </div>
        )}
      </Fragment>
    );
  }
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
};
const mediaScreen = {
  small: '@media screen and (max-width: 900px)',
};

const styles = StyleSheet.create({
  notifications: {
    border: 'thin dotted #e0344a',
    padding: '4px 16px',
    float: 'right',
    fontSize: '20px',
    [mediaScreen.small]: {
      width: '90%',
      border: 'none',
      backgroundColor: 'white',
    },
  },
  menuItem: {
    textAlign: 'right',
    marginRight: '16px',
    [mediaScreen.small]: {}
  },
  showOff: {
    marginRight: '8px',
    [mediaScreen.small]: {
      display: 'none',
    },
  },

  showOn: {
    marginRight: '8px',
  },
});


export default Notifications;
