import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Logger.css';
import Terminal from '../../components/Terminal';

class Logger extends React.Component {
  //   static propTypes = {
  //     news: PropTypes.arrayOf(
  //       PropTypes.shape({
  //         title: PropTypes.string.isRequired,
  //         link: PropTypes.string.isRequired,
  //         content: PropTypes.string,
  //       }),
  //     ).isRequired,
  //   };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2>Enter Dev Machine Details</h2>
          <Terminal />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Logger);
