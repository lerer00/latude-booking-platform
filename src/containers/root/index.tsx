import * as React from 'react';
import { Route } from 'react-router';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import Home from '../home';
import Properties from '../properties';
import Property from '../property';
import './index.css';

export namespace Root {
  export interface Props {
    // empty
  }

  export interface State {
    // empty
  }
}

class Root extends React.Component<Root.Props, Root.State> {
  constructor(props?: Root.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className='root-route'>
        <Header />
        <Route exact={true} path='/' component={Home} />
        <Route exact={true} path='/properties' component={Properties} />
        <Route exact={true} path='/properties/:pid' component={Property} />
        <Footer />
      </div>
    );
  }
}

export default Root;
