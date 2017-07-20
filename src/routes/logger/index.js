import React from 'react';
import Logger from './Logger';
import Layout from '../../components/Layout';

async function action({ fetch }) {
  return {
    chunks: ['logger'],
    title: 'Logger',
    component: (
      <Layout>
        <Logger />
      </Layout>
    ),
  };
}

export default action;
