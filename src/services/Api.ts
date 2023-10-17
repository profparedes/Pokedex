import axios from 'axios';
import config from 'config/index';

const Api = axios.create({
  baseURL: config.services.tradingCardApi.baseURL,
});

Api.interceptors.request.use((set) => {
  return {
    ...set,
    // params: {
    //   ...config.params,
    // },
  };
});

export default Api;
