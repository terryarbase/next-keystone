import {
  createStore,
  applyMiddleware,
} from 'redux';
import Immutable from 'immutable';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducers from '../reducers';

let reduxStore = null;

const logger = createLogger({ stateTransformer: state => state.toJS() });
const create = (initialState = {}) => createStore(
    reducers,
    Immutable.fromJS(initialState), // Hydrate the store with server-side data
    composeWithDevTools(
      applyMiddleware(createLogger({ stateTransformer: state => state.toJS() }), thunk)
    ),
);

const initStore = initialState => {
    // Make sure to create a new store for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        return create(initialState);
    }
  
    // Reuse store on the client-side
    if (!reduxStore) {
        reduxStore = create(initialState);
    }
    return reduxStore;
};

export default initStore;
