import React from 'react';
import Loadable from 'react-loadable';
import NPSpinner from '../../components/Spinner/Spinner';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: () => <div><NPSpinner /></div>,
});

export default {
  path: '/home',
  Component: Home,
};
