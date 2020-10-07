import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://bushlandscouts.tk/api/',
    // baseURL: 'http://127.0.0.1:8081/',
    timeout: 30000
    // withCredentials: true
  });
  instance.interceptors.request.use(
    config => {
      return config;
    },
    err => {
      return err;
    }
  );

  instance.interceptors.response.use(
    res => {
      return res.data;
    },
    err => {
      return err;
    }
  );

  return instance(config);
}
