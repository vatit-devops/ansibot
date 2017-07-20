import Request from 'superagent-bluebird-promise';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Terminal.css';
import { TextField } from 'material-ui';

class Terminal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={s.container}>
          
      </div>
    );
  }
}

export default withStyles(s)(Terminal);
