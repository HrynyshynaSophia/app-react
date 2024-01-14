import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../store/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
const composeEnhancers = composeWithDevTools({
	trace: true,
	traceLimit: 25,
});
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunkMiddleware))
);
// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
// const store = createStore(rootReducer, composedEnhancer);
export default store;
