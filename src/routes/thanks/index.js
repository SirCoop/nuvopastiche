import React from 'react';
import Loadable from 'react-loadable';
import NPSpinner from '../../components/Spinner/Spinner';

const ThankYou = Loadable({
  loader: () => import('./ThankYou'),
  loading: () => <div><NPSpinner /></div>,
});

export default {
  path: '/thanks',
  Component: ThankYou,
};
