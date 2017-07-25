/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Request from 'superagent-bluebird-promise';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Button } from 'material-ui';
import ss from 'socket.io-stream';

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: 'Provision',
      status: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting...');
    this.setState({ label: 'Processing...' });
    this.setState({ status: true });
    Request.post('http://localhost:3000/submit')
      .set('Accept', 'application/json')
      .send(this.props.submission)
      .query({ format: 'json' })
      .then(
        res => {
          console.log('Submit successful');
          this.setState({ label: 'Provision' });
          this.setState({ status: false });
          const response = JSON.parse(res.text);
          console.log(response);
          if (response.status) {
            alert('Your machine will now be provisioned!');
          } else {
            alert('Error!');
          }
        },
        error => {
          console.log(`Error! ${error}`);
        },
      );
  }

  handleSend(event) {
    this.props.socket.emit('submitData', this.props.submission);
    ss(this.props.socket).on('sendData', stream => {
      // console.log('Getting logs!');
      process.stdout.write('Getting logs yo!');
      stream.pipe(process.stdout);

      stream.on('data', function(chunk) {
          console.log('chunky chunky');
          size += chunk.length;
      });
    });
  }

  render() {
    return (
      <Button
        raised
        label={this.state.label}
        color="primary"
        onClick={this.handleSend}
        disabled={this.state.status}
      />
    );
  }
}

export default SubmitButton;
