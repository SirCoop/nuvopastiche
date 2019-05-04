import React from 'react';
import Loadable from 'react-loadable';
import NPSpinner from '../../components/Spinner/Spinner';

const Gallery = Loadable({
  loader: () => import('./Gallery'),
  loading: () => <div><NPSpinner /></div>,
});

export default {
  path: '/gallery',
  Component: Gallery,
};
