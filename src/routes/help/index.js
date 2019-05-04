import React from 'react';
import Loadable from 'react-loadable';

const Help = Loadable({
  loader: () => import('./HelpContainer'),
  loading: () => <div>Loading...</div>,
});

export default {
  path: '/help',
  Component: Help,
};
