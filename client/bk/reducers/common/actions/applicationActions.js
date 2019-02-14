import request from 'Client/utils/request';
// Action Types
import {
  	COMMON_REGISTER_APP,
  	COMMON_REGISTER_APP_SUCCESS,
	COMMON_REGISTER_APP_FAIL,
} from '../types';

export const registerApplicationFetch = () => ({
  	type: COMMON_REGISTER_APP,
});
export const registerApplicationSuccess = data => ({
  	type: COMMON_REGISTER_APP_SUCCESS,
  	data,
});
export const registerApplicationFail = err => ({
  	type: COMMON_REGISTER_APP_FAIL,
 	err,
});

// to be fixed as a static app info endpoint to register the application
const constantAppInfoUrl = 'http://localhost:3013/api/appInfo';

export const registerApplication = () => (dispatch, getState) => {
	dispatch(registerApplicationFetch());

	const requester = request.get({
		url: constantAppInfoUrl,
	});

	requester.then(response => {
		const { data } = response;
		dispatch(registerApplicationSuccess(data));
	})
	.catch(err => {
		dispatch(registerApplicationFail(err));
	})
};
