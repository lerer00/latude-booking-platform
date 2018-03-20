import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import Home from '../home';
import Property from '../property';
import './index.css';

export namespace Default {
  export interface Props {
    // empty
  }

  export interface State {
    // empty
  }
}

class Default extends React.Component<Default.Props, Default.State> {
  constructor(props?: Default.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className='default'>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route exact={true} path='/properties/:pid' component={Property} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Default;
