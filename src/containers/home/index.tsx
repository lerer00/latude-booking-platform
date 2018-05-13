import * as React from 'react';
import Finder from '../../components/finder';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import './index.css';

import { Props, State } from './model';
import {
  updateFinderAction, searchFinderAction
} from './actions';

class Home extends React.Component<Props> {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='route-container home-route '>
        <div className='route-content content'>
          <Finder
            buttonText={'Search'}
            update={this.props.updateFinder}
            search={this.props.searchFinder}
            isLoading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: {}) => {
  const homeState: State = state['home'];
  return {
    isLoading: homeState.isLoading,
    properties: homeState.properties
  };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
  return {
    updateFinder: (prop: string, value: any) => { dispatch(updateFinderAction(prop, value)); },
    searchFinder: () => { dispatch(searchFinderAction()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);