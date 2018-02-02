import * as React from 'react';
import './index.css';

export namespace Tiles {
    export interface Props {
        list: Array<any>;
        empty: any;
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
        var items: any;
        if (this.props.list.length <= 0) {
            items = this.props.empty;
        } else {
            items = this.props.list;
        }

        return (
            <div className='tiles'>
                <div className='content'>
                    {items}
                </div>
            </div>
        );
    }
}

export default Tiles;