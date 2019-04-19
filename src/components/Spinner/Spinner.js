import React from 'react';
import { css } from '@emotion/core';
import { RingLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 25vh auto;
    position: relative;
    z-index: 9999;
`;

const NPSpinner = () => {
  return (
    <div className="np-spinner-container">
      <RingLoader
        css={override}
        sizeUnit="px"
        size={60}
        color="#05f5c6"
        activateSpinner
      />
    </div>
  );
};

NPSpinner.defaultProps = {
};

NPSpinner.propTypes = {
};

export default NPSpinner;
