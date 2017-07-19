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
import s from './Form.css';
import { TextField } from 'material-ui';
import SubmitButton from '../SubmitButton';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: '',
      user: '',
      password: '',
      filesRemote: '',
      filesRoot: '',
    };
    this.handleHost = this.handleHost.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleFilesRemote = this.handleFilesRemote.bind(this);
    this.handleFilesRoot = this.handleFilesRoot.bind(this);
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

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <TextField
                id="host"
                onChange={this.handleHost}
                floatingLabelText="Host IP"
                required
              />
            </div>
            <div>
              <TextField
                id="user"
                onChange={this.handleUser}
                floatingLabelText="Username"
                required
              />
            </div>
            <div>
              <TextField
                id="password"
                onChange={this.handlePassword}
                floatingLabelText="Password"
                type="password"
                required
              />
            </div>
            <div>
              <TextField
                id="filesRemote"
                onChange={this.handleFilesRemote}
                floatingLabelText="Host Files Directory"
                defaultValue="\\192.168.10.6\devops\dev-machine"
              />
            </div>
            <div>
              <TextField
                id="filesRoot"
                onChange={this.handleFilesRoot}
                floatingLabelText="Host Files Root"
                value={`C:\\Users\\${this.state.user}\\Downloads\\`}
              />
            </div>
            <div>
              <SubmitButton
                label="Provision"
                submission={this.state}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Form);
