import React from 'react';
import Loadable from 'react-loadable';

const Contact = Loadable({
  loader: () => import('./Contact'),
  loading: () => <div>Loading...</div>,
});

export default {
  path: '/contact',
  Component: Contact,
};
