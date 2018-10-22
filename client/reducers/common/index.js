import Immutable from 'immutable';

const CommonState = Immutable.fromJS({
	application: {
	    isLoading: false,
	    isSuccess: false,
		appInfo: null,
	},
});

export default CommonState;
