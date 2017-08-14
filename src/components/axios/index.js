import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://api-web-page.com';

export function fetch(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
export default {
  // 获取我的页面的后台数据
  mineBaseMsgApi() {
    // alert('进入api.js')
    return fetch('/api/getBoardList');
  },
  commonApi(url, params) {
    return fetch(url, params)
  }
}
