import * as React from 'react';
import * as PropTypes from 'prop-types';
import '../index.css';
import './index.css';
import { IAsset } from '../../../models/asset';
import { Button, IButtonState } from '../../button';
import { person, bedSingle } from '../../../img/index';

const web3 = window['web3'];
const contract = require('truffle-contract');
const PropertyContract = require('../../../build/contracts/Property.json');
const propertyContract = contract(PropertyContract);

export namespace AssetTile {
    export interface Props {
        asset: IAsset;
    }

    export interface State {
        // empty
    }
}

class AssetTile extends React.Component<AssetTile.Props, AssetTile.State> {
    static contextTypes = {
        web3: PropTypes.object
    };

    constructor() {
        super();

        this.bookAsset = this.bookAsset.bind(this);
    }

    componentDidMount() {
        propertyContract.setProvider(web3.currentProvider);
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

    bookAsset() {
        console.log(this.props.asset);
        var propertyInstance: any;
        var assetId: string = this.props.asset.id.split('&')[1];
        propertyContract.at(this.props.asset.parent).then((instance: any) => {
            propertyInstance = instance;
            var durationInDays = 2;
            return propertyInstance.getStayPriceInWei.call(assetId, durationInDays, { from: this.context.web3.selectedAccount });
        }).then((priceInWei: any) => {
            return propertyInstance.addStay(
                assetId,
                1522296000,
                1522555199,
                {
                    from: this.context.web3.selectedAccount,
                    value: priceInWei
                });
        }).then((receipt: any) => {
            console.log('Stay added');
        });
    }

    render() {
        return (
            <div className='tile tile-asset' key={this.props.asset.id}>
                <div className='tile-asset-grid'>
                    <div className='sleep'>
                        <div className='detail'>
                            <img src={person} />
                            <span>x 2</span>
                        </div>
                        <div className='detail'>
                            <img src={bedSingle} />
                            <span>x 2</span>
                        </div>
                    </div>
                    <div className='information'>
                        <h1 className='name'>King Room - City View</h1>
                        <div className='description'>{this.props.asset.description}</div>
                    </div>
                    <div className='availability'>{
                        !this.props.asset.active ?
                            <p className='no-vacancy' >no-vacancy</p> :
                            <div>
                                <p className='price'>{this.props.asset.price} <span className='currency'>{this.props.asset.currency}</span></p>
                                <Button className='book-button' text='Book' state={IButtonState.default} action={this.bookAsset} isLoading={false} />
                            </div>
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetTile;