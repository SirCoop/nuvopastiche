const CONSTANTS = {
  API_ROOT: process.env.NODE_ENV === 'development' ? process.env.DEV_API_ROOT : process.env.PROD_API_ROOT,
};

console.log('process.env: ', process.env.NODE_ENV);

export default CONSTANTS;
