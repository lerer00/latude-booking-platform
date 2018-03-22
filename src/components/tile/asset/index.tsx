import * as React from 'react';
import '../index.css';
import './index.css';
import IAsset from '../../../model/asset';

export namespace AssetTile {
    export interface Props {
        asset: IAsset;
    }

    export interface State {
        // empty
    }
}

class AssetTile extends React.Component<AssetTile.Props, AssetTile.State> {
    constructor() {
        super();
    }

    public static defaultProps: Partial<AssetTile.Props> = {
        asset: {
            id: '',
            name: '',
            description: '',
            active: false,
            parent: '',
            staysMap: {},
            stays: [],
            price: -1,
            currency: ''
        }
    };

    render() {
        return (
            <div className='tile tile-asset' key={this.props.asset.id}>
                <div className='tile-aset-grid'>
                    {this.props.asset.id},
                    {this.props.asset.price}{this.props.asset.currency}
                </div>
            </div>
        );
    }
}

export default AssetTile;