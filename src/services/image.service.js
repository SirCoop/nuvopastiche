/* eslint no-use-before-define: 0 */ // --> OFF
import axios from 'axios';
// import _ from 'lodash';
import CONSTANTS from '../constants';

const { API_ROOT } = CONSTANTS;

const imageService = {
  getCarouselImageUrls: () => getCarouselImageUrls().then(res => marshallImageUrls(res.data)),
};

export default imageService;

const getCarouselImageUrls = () => {
  return axios.get(`${API_ROOT}/api/images/carousel`);
};

const marshallImageUrls = ({ data }) => {
  const marshalledData = data.map((fileObj) => {
    const { name, src } = fileObj;
    return {
      name,
      src: `${API_ROOT}/${src}`,
    };
  });
  return marshalledData;
};
