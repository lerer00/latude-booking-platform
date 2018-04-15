import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Root from './containers/root';
import store from './store';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div>
        <Provider store={store}>
          <BrowserRouter>
            <Root />
          </BrowserRouter>
          </Provider>
        </div>
      </div>
    );
  }
}

export default App;