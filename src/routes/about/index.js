import React from 'react';
import Loadable from 'react-loadable';

const About = Loadable({
  loader: () => import('./About'),
  loading: () => <div>Loading...</div>,
});

export default {
  path: '/about',
  Component: About,
};
