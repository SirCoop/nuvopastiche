import React from 'react';
import Loadable from 'react-loadable';

const Gallery = Loadable({
  loader: () => import('./Gallery'),
  loading: () => <div>Loading...</div>,
});

export default {
  path: '/gallery',
  Component: Gallery,
};
