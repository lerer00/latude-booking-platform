import * as React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import './index.css';
import axios, { AxiosResponse } from 'axios';
import {
    bookShelf, computerPc, disableSign, forkSpoon,
    lockKey, networkWifiSignal, petAllow, presentation,
    smokeFreeArea, locationPin
} from '../../img/index';
import Rating from '../../components/rating';
import Tiles from '../../components/tiles';
import RoomTile from '../../components/tile/asset/room';
import EmptySearch from '../../components/emptySearch';
import { Button, IButtonState } from '../../components/button';
import { IProperty } from '../../models/property';
import { IAsset } from '../../models/asset/asset';
import { goBack } from 'react-router-redux';
import store from '../../store';
import { AssetTypes } from '../../models/asset/types';

export namespace Property {
    export interface Props {
        match: any;
    }

    export interface State {
        property: IProperty;
        assets: Array<IAsset>;
    }
}

class Property extends React.Component<Property.Props, Property.State> {
    constructor(props?: Property.Props, context?: any) {
        super(props, context);

        this.state = {
            property: {
                id: '',
                name: '',
                description: '',
                rating: 0,
                comments: [],
                images: [],
                amenities: {
                    accessibility: {
                        value: false
                    },
                    computers: {
                        value: false
                    },
                    conferenceVenues: {
                        value: false
                    },
                    library: {
                        value: false
                    },
                    lockers: {
                        value: false
                    },
                    pet: {
                        value: false
                    },
                    restaurants: {
                        value: false
                    },
                    smoking: {
                        value: false
                    },
                    wifi: {
                        value: false
                    }
                },
                active: false,
                parent: '',
                location: {
                    coordinates: [0, 0],
                    type: ''
                }
            },
            assets: [],
        };
    }

    componentWillMount() {
        axios.get(process.env.REACT_APP_HUB_URL + '/properties/' + this.props.match.params.pid).then((response: AxiosResponse<IProperty>) => {
            this.setState({
                property: response.data
            });

            return axios.get(process.env.REACT_APP_HUB_URL + '/assets?property=' + this.props.match.params.pid);
        }).then((response) => {
            this.setState({
                assets: response.data
            });
        }).catch((error: any) => {
            console.log(error);
        });
    }

    render() {
        var rooms: Array<any> = [];
        rooms = this.state.assets.filter(a => a.type === AssetTypes.ROOM).map((a) => { return <RoomTile key={a.id} asset={a} />; });

        return (
            <div className='route-container property-route' >
                <div className='header-spacer'>
                    &nbsp;
                </div>
                <div className='cover'>
                    <div style={{ backgroundImage: `url(${this.state.property.images[0]})` }} />
                </div>
                <div className='route-content content'>
                    <div className='property-detail'>
                        <StickyContainer>
                            <Sticky>
                                {({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }: any) => {

                                    return <div style={style}>
                                        <div className='sticky-container'>
                                            <Button className='sticky-button' text='Back' state={IButtonState.default} action={() => { store.dispatch(goBack()); }} isLoading={false} />
                                            {/* <Button className='sticky-button' text='Save' state={IButtonState.default} action={() => { store.dispatch(goBack()); }} isLoading={false} />
                                            <Button className='sticky-button' text='Like' state={IButtonState.default} action={() => { store.dispatch(goBack()); }} isLoading={false} /> */}
                                        </div>
                                    </div>;
                                }}
                            </Sticky>

                            <div className='main-info'>
                                <h1 className='name'>{this.state.property.name}</h1><Rating max={5} score={this.state.property.rating} />
                                <h2 className='location'><img src={locationPin}/> Québec, Canada, G1C5W5</h2>
                                <h3 className='description'>{this.state.property.description}</h3>
                            </div>
                            <div className='amenities'>
                                <h1 className='title'>Facility</h1>
                                <ol className='list'>
                                    {this.state.property.amenities.library.value &&
                                        <li className='amenity'>
                                            <img src={bookShelf} />
                                            <span>Library</span>
                                        </li>}

                                    {this.state.property.amenities.computers.value &&
                                        <li className='amenity'>
                                            <img src={computerPc} />
                                            <span>Computers</span>
                                        </li>}

                                    {this.state.property.amenities.accessibility.value &&
                                        <li className='amenity'>
                                            <img src={disableSign} />
                                            <span>Facility for disable guests</span>
                                        </li>}

                                    {this.state.property.amenities.lockers.value &&
                                        <li className='amenity'>
                                            <img src={lockKey} />
                                            <span>Lockers</span>
                                        </li>}

                                    {this.state.property.amenities.restaurants.value &&
                                        <li className='amenity'>
                                            <img src={forkSpoon} />
                                            <span>Restaurant on place</span>
                                        </li>}

                                    {this.state.property.amenities.wifi.value &&
                                        <li className='amenity'>
                                            <img src={networkWifiSignal} />
                                            <span>Wifi available</span>
                                        </li>}

                                    {this.state.property.amenities.pet.value &&
                                        <li className='amenity'>
                                            <img src={petAllow} />
                                            <span>Pets are allowed</span>
                                        </li>}

                                    {this.state.property.amenities.conferenceVenues.value &&
                                        <li className='amenity'>
                                            <img src={presentation} />
                                            <span>Conference venues</span>
                                        </li>}

                                    {this.state.property.amenities.smoking.value &&
                                        <li className='amenity'>
                                            <img src={smokeFreeArea} />
                                            <span>Smoke free area</span>
                                        </li>}
                                </ol>
                            </div>
                            <div className='gallery'>
                                <h1 className='title'>Photos</h1>
                                <div className='grid'>
                                    {
                                        this.state.property.images.map((image: string, index: number) => {
                                            return <div className='manage-property-modal-current-image-container' key={index}>
                                                <img className='manage-property-modal-current-image' src={image} />
                                            </div>;
                                        })
                                    }
                                </div>
                            </div>
                            <div className='assets'>
                                <h1 className='title'>Rooms</h1>
                                <div className='assets-list'>
                                    <Tiles list={rooms} empty={<EmptySearch text={'There\'s no room found within this property.'} />} />
                                </div>
                            </div>
                        </StickyContainer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Property;