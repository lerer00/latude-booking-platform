import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { history } from './store';
import Root from './containers/root';
import store from './store';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Root />
            </ConnectedRouter>
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;