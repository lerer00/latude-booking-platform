import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../header';
import Footer from '../footer';
import Default from './default';
import './index.css';

export namespace Home {
  export interface Props {
    // empty
  }

  export interface State {
    // empty
  }
}

class Home extends React.Component<Home.Props, Home.State> {
  constructor(props?: Home.Props, context?: any) {
    super(props, context);
  }

  render() {
    return (
      <div className='home'>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={Default} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Home;
