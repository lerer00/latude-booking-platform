import * as React from 'react';
import './index.css';

export namespace Tiles {
    export interface Props {
        list: Array<any>;
    }

    export interface State {
        // empty
    }
}

class Tiles extends React.Component<Tiles.Props, Tiles.State> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='tiles'>
                <div className='content'>
                    <h1>OK</h1>
                </div>
            </div>
        );
    }
}

export default Tiles;