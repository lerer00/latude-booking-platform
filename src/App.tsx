import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Default from './containers/default';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div>
          <BrowserRouter>
            <Default />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;