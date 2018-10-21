import {
  post,
  get,
} from 'axios';
import {
  stringify,
} from 'qs';

const get = async ({ url, param }) => (
    await get(`${url}?${stringify(param)}`);
);

const get = async ({ url, param, options = {} }) => (
    await post(`${url}`, stringify(param), options);
);
// const handleExpiredToken = () => {
//   const cookie = new Cookie();
//   const admin = cookie.get('admin', { path: '/' });
//   if (admin) {
//     window.alert('你的登入已失效，請重新登入');
//     cookie.remove('admin', { path: '/' });
//     window.location.href = `${window.location.origin}/Login`;
//   }
// };

export default {
  get,
  post,
};
