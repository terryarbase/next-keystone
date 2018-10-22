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
// cosnt applicationReducer = (state, action) => {
//     switch (action.type) {
//         case COMMON_REGISTER_APP: {
//             return state
//                 .setIn(['application', 'isLoading'], false)
//                 .setIn(['application', 'isSuccess'], false)
//                 .setIn(['application', 'appInfo'], null);
//         }
//         case COMMON_REGISTER_APP_SUCCESS: {
//             return state
//               .setIn(['application', 'isLoading'], true)
//               .setIn(['application', 'isSuccess'], true)
//               .setIn(['application', 'appInfo'], payload);
//         }
//         case COMMON_REGISTER_APP_FAIL: {
//             state
//               .setIn(['application', 'isLoading'], true)
//               .setIn(['application', 'isSuccess'], false);
//         }
//         default: {
//             return state;
//         }
//     }
// };
const applicationReducer = {
  COMMON_REGISTER_APP: state => (
    state
      .setIn(['application', 'isLoading'], false)
      .setIn(['application', 'isSuccess'], false)
      .setIn(['application', 'appInfo'], null)
  ),
  COMMON_REGISTER_APP_SUCCESS: (state, payload) => (
    state
      .setIn(['application', 'isLoading'], true)
      .setIn(['application', 'isSuccess'], true)
      .setIn(['application', 'appInfo'], payload)
  ),
  COMMON_REGISTER_APP_FAIL: state => (
    state
      .setIn(['application', 'isLoading'], true)
      .setIn(['application', 'isSuccess'], false)
  ),
};

const commonReducers = handleActions({
	...applicationReducer,
}, CommonState);

export default commonReducers;
