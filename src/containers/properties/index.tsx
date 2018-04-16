import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import './index.css';

import { Props, State } from './model';
import {
    searchFinderAction
} from '../home/actions';

class Properties extends React.Component<Props, State> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='properties-route route-container'>
                <div className='route-content content'>
                    <h1>{this.props.properties.toString()}</h1>
                    <button onClick={this.props.searchFinder}>go</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: {}) => {
    const propertiesState: State = state['properties'];
    const homeState: State = state['home'];
    return {
        isLoading: propertiesState.isLoading,
        properties: homeState.properties
    };
};

const mapDispatchToProps = (dispatch: Dispatch<State>) => {
    return {
        searchFinder: () => { dispatch(searchFinderAction()); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);