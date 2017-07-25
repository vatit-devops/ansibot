/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Form.css';
import { TextField, Button, Grid, Paper } from 'material-ui';
import Terminal from '../Terminal';
import io from 'socket.io-client';
import Ansi from 'ansi-to-html';

const convert = new Ansi({ stream: true });

class Form extends React.Component {
  static contextTypes = { fetch: PropTypes.func.isRequired };
  constructor(props) {
    super(props);
    this.state = {
      host: '',
      user: '',
      password: '',
      filesRemote: '',
      filesRoot: '',
      label: 'Submit',
      status: false,
      logs: 'Logging Area....   ',
    };
    this.handleHost = this.handleHost.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleFilesRemote = this.handleFilesRemote.bind(this);
    this.handleFilesRoot = this.handleFilesRoot.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io.connect(props.serverIP);
  }

  componentDidMount() {
    // const socket = io.connect(this.props.serverIP);
    this.socket.on('connect', () => console.log('Socket connected!'));
    this.socket.on('sendLog', data => {
      console.log(data.toString('ansi'));
      const tempString = this.state.logs + convert.toHtml(data);
      this.setState({ logs: tempString });
    });
    this.socket.on('endLog', data => {
      console.log('Provision complete.');
      this.setState({ label: 'Complete!' });
    });
  }

  handleHost(event) {
    this.setState({ host: event.target.value });
  }

  handleUser(event) {
    this.setState({ user: event.target.value });
  }

  handlePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleFilesRemote(event) {
    this.setState({ filesRemote: event.target.value });
  }

  handleFilesRoot(event) {
    this.setState({ filesRoot: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ label: 'Provisioning...', status: true });
    this.socket.emit('submitData', this.state);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Grid container gutter={40}>
            <Grid item md={4}>
              <Paper>
                <form className={s.formSpec} onSubmit={this.handleSubmit}>
                  <div>
                    <TextField
                      id="host"
                      label="Host"
                      onChange={this.handleHost}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="user"
                      label="Username"
                      onChange={this.handleUser}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="password"
                      label="Password"
                      onChange={this.handlePassword}
                      type="password"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="filesRemote"
                      onChange={this.handleFilesRemote}
                      label="Host Files Directory"
                      defaultValue="\\192.168.10.6\devops\dev-machine"
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="filesRoot"
                      onChange={this.handleFilesRoot}
                      label="Host Files Root"
                      value={`C:\\Users\\${this.state.user}\\Downloads\\`}
                      margin="normal"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Button
                      raised
                      onClick={this.handleSubmit}
                      disabled={this.state.status}
                      color="primary"
                    >
                      {this.state.label}
                    </Button>
                  </div>
                </form>
              </Paper>
            </Grid>
            <Grid item md>
              <Terminal logs={this.state.logs} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Form);
