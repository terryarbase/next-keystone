import { handleActions } from 'redux-actions';
import CommonState from '../';

import {
  	COMMON_REGISTER_APP,
  	COMMON_REGISTER_APP_SUCCESS,
    COMMON_REGISTER_APP_FAIL,
} from '../types';

/*
** Handle for application related action reducers
*/
const applicationReducers = handleActions({
  [COMMON_REGISTER_APP]: state => (
    state
      .setIn(['application', 'isLoading'], false)
      .setIn(['application', 'isSuccess'], false)
      .setIn(['application', 'appToken'], null)
  ),
  [COMMON_REGISTER_APP_SUCCESS]: (state, { payload: { token } }) => (
    state
      .setIn(['application', 'isLoading'], true)
      .setIn(['application', 'isSuccess'], true)
      .setIn(['application', 'appToken'], token)
  ),
  [COMMON_REGISTER_APP_FAIL]: state => (
    state
      .setIn(['application', 'isLoading'], true)
      .setIn(['application', 'isSuccess'], false)
  ),
}, CommonState);

export default applicationReducers;
