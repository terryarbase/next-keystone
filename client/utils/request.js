import axios from 'axios';
import {
  stringify,
} from 'qs';

const getRequest = ({ url, params= {} }) => {
    return axios({
	    method: 'GET',
	    params,
	    url,
	});
};

const postRequest = ({ url, params = {}, data = {} }) => {
    return axios({
	    method: 'post',
		url,
		params,
		data,
	});
};
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
  get: getRequest,
  post: postRequest,
};
