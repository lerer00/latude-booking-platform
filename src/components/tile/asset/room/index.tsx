import * as React from 'react';
import * as PropTypes from 'prop-types';
import './index.css';
import RoomAmenity from '../room/amenity';
import { IAsset } from '../../../../models/asset/asset';
import { Button, IButtonState } from '../../../button';
import store from '../../../../store';

const web3 = window['web3'];
const contract = require('truffle-contract');
const PropertyContract = require('latude-contracts/build/contracts/Property.json');
const propertyContract = contract(PropertyContract);

export interface Props {
    asset: IAsset;
}

export interface State {
    // empty
}

class RoomTile extends React.Component<Props, State> {
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

    public static defaultProps: Partial<Props> = {
        asset: {
            id: '',
            type: -1,
            name: '',
            description: '',
            active: false,
            parent: '',
            bookingsMap: {},
            bookings: [],
            amenities: [],
            price: -1,
            currency: ''
        }
    };

    bookAsset() {
        var propertyInstance: any;
        var assetId: string = this.props.asset.id.split('&')[1];
        console.log(this.props.asset.parent, assetId);
        propertyContract.at(this.props.asset.parent).then((instance: any) => {
            propertyInstance = instance;
            var durationInDays = 2;
            return propertyInstance.getBookingPriceInWei.call(assetId, durationInDays, { from: this.context.web3.selectedAccount });
        }).then((priceInWei: any) => {
            // retrieve dates from the store
            var dateRange = store.getState()['home']['finder']['dateRange'];
            console.log(dateRange.startDate.unix(), dateRange.endDate.unix());

            return propertyInstance.addBooking(
                assetId,
                dateRange.startDate.unix(),
                dateRange.endDate.unix(),
                {
                    from: this.context.web3.selectedAccount,
                    value: priceInWei
                });
        }).then((receipt: any) => {
            console.log('Booking added');
        });
    }

    render() {
        return (
            <div className='tile tile-asset' key={this.props.asset.id}>
                <div className='tile-asset-grid'>
                    <div className='information'>
                        <h1 className='name'>{this.props.asset.description}</h1>
                        <p className='description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                        <RoomAmenity amenities={this.props.asset.amenities} />
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

export default RoomTile;