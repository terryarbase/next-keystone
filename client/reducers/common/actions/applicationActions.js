import request from '../../../utils/request';
// Action Types
import {
  	COMMON_REGISTER_APP,
  	COMMON_REGISTER_APP_SUCCESS,
	COMMON_REGISTER_APP_FAIL,
} from '../types';

export const registerApplicationFetch = () => ({
  	type: 'COMMON_REGISTER_APP',
});
export const registerApplicationSuccess = data => ({
  	type: 'COMMON_REGISTER_APP_SUCCESS',
  	data,
});
export const registerApplicationFail = err => ({
  	type: 'COMMON_REGISTER_APP_FAIL',
 	err,
});

export const registerApplication = () => async(dispatch, getState) => {
	dispatch(registerApplicationFetch());

	try {
		const response = await request.get('/api');
		dispatch(receiveAllNewsListSuccess(response));
	} catch (err) {
		dispatch(receiveAllNewsListFail(err));
	}
};
