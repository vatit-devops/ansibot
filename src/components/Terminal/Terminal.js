import React from 'react';
import Request from 'superagent-bluebird-promise';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Paper } from 'material-ui';
import s from './Terminal.css';

class Terminal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper>
        <div className={s.container}>
          <div className={s.terminal}>
           <div dangerouslySetInnerHTML={{ __html: this.props.logs }} />
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(s)(Terminal);
