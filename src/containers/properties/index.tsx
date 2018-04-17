import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Tiles from '../../components/tiles';
import PropertyTile from '../../components/tile/property';
import EmptySearch from '../../components/emptySearch';
import './index.css';

import { Props, State } from './model';
import {
    searchFinderAction
} from '../home/actions';

class Properties extends React.Component<Props, State> {
    constructor() {
        super();
    }

    filterProperties(): Array<PropertyTile> {
        var properties: any = [];
        this.props.properties.map((property, index) => {
            properties.push(<PropertyTile property={property} />);
        });

        return properties;
    }

    render() {
        var properties = this.filterProperties();

        return (
            <div className='route-container properties-route '>
                <div className='header-spacer'>
                    &nbsp;
                </div>
                <div className='route-content content'>
                    <div className='filtered-properties-list'>
                        <Tiles list={properties} empty={<EmptySearch text={'There\'s no property found in regard to your criteria. Please select another region.'} />} />
                    </div>
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