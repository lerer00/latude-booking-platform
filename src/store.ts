import main from './reducers/main';
import { createStore } from 'redux';

import { applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

export const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(main, applyMiddleware(middleware));
export default store; 