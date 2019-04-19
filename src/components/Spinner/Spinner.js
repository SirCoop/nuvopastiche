import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 25vh auto;
    position: relative;
    z-index: 9999;
`;

const NPSpinner = (props) => {
  const { loading } = props;
  return loading
    ? (
      <div className="np-spinner-container">
        <RingLoader
          css={override}
          sizeUnit="px"
          size={60}
          color="#05f5c6"
          loading
        />
      </div>
    ) : '';
};

NPSpinner.defaultProps = {
  loading: PropTypes.bool.isRequired,
};

NPSpinner.propTypes = {
  loading: PropTypes.bool,
};

export default NPSpinner;
