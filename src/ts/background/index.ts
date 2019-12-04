import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import { configureApp } from './AppConfig';
import reducers, { loadState } from './store';

//const DEV_TOOLS: string = '__REDUX_DEVTOOLS_EXTENSION__ ';
//window[DEV_TOOLS] && window[DEV_TOOLS]();

const preloadedState = loadState();
const store = createStore(
	reducers,
	preloadedState,
	(window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

configureApp(store);
wrapStore(store);
