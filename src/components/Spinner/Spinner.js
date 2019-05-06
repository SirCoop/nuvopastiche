import React from 'react';
import { css } from '@emotion/core';
import { FadeLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 43vh auto;
    position: relative;
    z-index: 9999;
`;

const NPSpinner = () => {
  return (
    <div className="np-spinner-container">
      <FadeLoader
        css={override}
        sizeUnit="px"
        size={40}
        color="#fff"
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
