import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from "aphrodite";

class NotificationItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render () {
    const { id, type, html, value, markAsRead } = this.props;
    const mystyles = css(type === 'urgent' ? styles.urgent : styles.default);
    let item;
    value
      ? item = (
        <li
          className={mystyles}
          data-notification-type={ type }
          onClick={ () => markAsRead(id) }
        >
          {value}
        </li>
      ) : item = (
        <li
          className={mystyles}
          data-notification-type={ type }
          dangerouslySetInnerHTML={ html }
          onClick={ () => markAsRead(id) }
        />
      );
    return item;
  }
}

NotificationItem.propTypes = {
  type: PropTypes.string,
  html: PropTypes.shape({
    __html: PropTypes.string
  }),
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number,
};

NotificationItem.defaultProps = {
  type: 'default',
  html: {},
  value: '',
  markAsRead: () => {},
  id: NaN,
};

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },

  urgent: {
    color: 'red',
  },
});



export default NotificationItem;
