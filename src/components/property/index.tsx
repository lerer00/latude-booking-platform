import * as React from 'react';
import './index.css';

export namespace Property {
    export interface Props {
        // empty
    }

    export interface State {
        // empty
    }
}

class Property extends React.Component<Property.Props, Property.State> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='route-container property'>
                <div className='route-content content'>
                    <h1>asd</h1>
                </div>
            </div>
        );
    }
}

export default Property;