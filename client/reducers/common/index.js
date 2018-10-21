import Immutable from 'immutable';

const CommonState = Immutable.fromJS({
	application: {
	    isLoading: false,
	    isSuccess: false,
		appToken: null,
	},
});

export default CommonState;
