import React from 'react';
import Loadable from 'react-loadable';
import NPSpinner from '../../components/Spinner/Spinner';

const Contact = Loadable({
  loader: () => import('./Contact'),
  loading: () => <div><NPSpinner /></div>,
});

export default {
  path: '/contact',
  Component: Contact,
};
