import axios from 'axios'
import Cookie from 'js-cookie'

const http = axios.create({
  baseURL: 'http://150.158.17.116:8080',
  timeout: 10000,
})

http.interceptors.request.use(function (config) {
  let token = Cookie.get('token')
  if ( token && token !== '' ){
    config.headers['token'] = token
  }
  return config;
  }, function (error) {
    return Promise.reject(error)
  });

http.interceptors.response.use(function (response) {
  if(response.data.code === 401){
    Cookie.remove('token')
    this.$router.push('/login')
  }
  return response;
  }, function (error) {
    return Promise.reject(error)
  });

export default http