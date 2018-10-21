import { combineReducers } from 'redux-immutable';
import commonReducers from './common/reducers';

const rootReducer = combineReducers({
	...commonReducers,
});

export default rootReducer;
