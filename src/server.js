/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import expressGraphQL from 'express-graphql';
import fetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models from './data/models';
// import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import Docker from 'dockerode';
import http from 'http';
import Socketio from 'socket.io';

const Os = require('os');

const stream = require('stream');

const app = express();
const server = new http.Server(app);
const io = new Socketio(server);

const docker = new Docker();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());

if (__DEV__) {
  app.enable('trust proxy');
}

//
// Register API middleware
// -----------------------------------------------------------------------------
// app.use(
//   '/graphql',
//   expressGraphQL(req => ({
//     schema,
//     graphiql: __DEV__,
//     rootValue: { request: req },
//     pretty: __DEV__,
//   })),
// );

app.get('/api/ip', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const endPoint = process.env.NODE_ENDPOINT_IP || 'http://localhost:3000';
  res.send(JSON.stringify(endPoint));
});

app.post('/submit', (req, res) => {
  console.log(req.body);
  if (req.body.host && req.body.user && req.body.password) {
    dockerAnsible(req, res);
  } else {
    res.redirect('/');
  }
});

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Universal HTTP client
      fetch: createFetch(fetch, {
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie,
      }),
      // serverIP: process.env.NODE_ENDPOINT_IP || config.api.serverUrl,
    };

    const route = await router.resolve({
      ...context,
      path: req.path,
      query: req.query,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context}>
        {route.component}
      </App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    // io.listen(
    server.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
    // );
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

function dockerAnsible(data, dataStream) {
  // console.log(data);
  docker
    .run(
      process.env.NODE_ENV_IMAGE || 'halosan/ansible-auto:local',
      // 'halosan/ansible-auto:local',
      ['/tmp/run.sh', data.host, data.user, data.password],
      dataStream,
      // process.stdout,
    )
    .then(container => {
      console.log('Removing container');
      return container.remove();
    })
    .then(res => {
      console.log('Container Removed');
      // res.send(JSON.stringify({ status: true }));
      // return { status: true };
    })
    .catch(err => {
      console.log(err);
      // res.send(JSON.stringify({ status: false }));
      // return { status: true };
    });
}

io.on('connection', socket => {
  console.log('Client Connected!');
  const dataStream = new stream.Writable();
  dataStream.setDefaultEncoding('utf8');
  dataStream._write = function(chunk, encoding, done) {
    console.log(chunk.toString());
    socket.emit('sendLog', chunk.toString());
    done();
  };
  socket.on('submitData', data => {
    console.log('Got submission!');
    dockerAnsible(data, dataStream);
  });
  dataStream.on('finish', data => {
    console.log('End log');
    socket.emit('endLog');
  });
});

export default app;
