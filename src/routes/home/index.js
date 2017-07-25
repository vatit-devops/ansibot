/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import Home from './Home';
import Layout from '../../components/Layout';
import Form from '../../components/Form';

async function action({ fetch }) {
  // const resp = await fetch('/graphql', {
  //   body: JSON.stringify({
  //     query: '{news{title,link,content}}',
  //   }),
  // });
  // const { data } = await resp.json();
  // if (!data || !data.news) throw new Error('Failed to load the news feed.');
  // const ip = await fetch('http://localhost:3000/myip');
  // const ipAddr = await ip.json();
  // const resp = await fetch('/endpoints/ip');
  const resp = await fetch('/api/ip', { method: 'GET' });
  const data = await resp.json();
  return {
    chunks: ['home'],
    title: 'Ansibot',
    component: (
      <Layout>
        <Form serverIP={data}/>
      </Layout>
    ),
  };
}

export default action;
