import React from 'react';
import Loadable from 'react-loadable';
import NPSpinner from '../../components/Spinner/Spinner';

const Help = Loadable({
  loader: () => import('./HelpContainer'),
  loading: () => <div><NPSpinner /></div>,
});

export default {
  path: '/help',
  Component: Help,
};
