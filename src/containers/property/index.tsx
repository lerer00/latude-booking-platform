import * as React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import './index.css';
import axios, { AxiosResponse } from 'axios';
import {
    bookShelf, computerPc, disableSign, forkSpoon,
    lockKey, networkWifiSignal, petAllow, presentation,
    smokeFreeArea, locations, locationPin
} from '../../img/index';
import Tiles from '../../components/tiles';
import TileAsset from '../../components/tile/asset';
import EmptySearch from '../../components/emptySearch';
import { Button, IButtonState } from '../../components/button';
import { IProperty } from '../../models/property';
import { IAsset } from '../../models/asset';
import { goBack } from 'react-router-redux';
import store from '../../store';

const Marker = require('react-mapbox-gl').Marker;
const Cluster = require('react-mapbox-gl').Cluster;
const ReactMapboxGl = require('react-mapbox-gl').default;
const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    attributionControl: false,
    logoPosition: 'top-left'
});

export namespace Property {
    export interface Props {
        match: any;
    }

    export interface State {
        property: IProperty;
        assets: Array<IAsset>;
        mapOptions: any;
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
            mapOptions: {
                zoom: [8],
                center: [0, 0]
            }
        };
    }

    componentWillMount() {
        axios.get(process.env.REACT_APP_HUB_URL + '/properties/' + this.props.match.params.pid).then((response: AxiosResponse<IProperty>) => {
            this.setState({
                mapOptions: {
                    center: response.data.location.coordinates
                },
                property: response.data
            });

            return axios.get(process.env.REACT_APP_HUB_URL + '/assets');
        }).then((response) => {
            this.setState({
                assets: response.data
            });
        }).catch((error: any) => {
            console.log(error);
        });
    }

    clusterMarker = (coordinates: any) => (
        <Marker coordinates={coordinates}>
            <img className='marker' src={locations} />
        </Marker>
    )

    render() {
        var markers: any = [];
        markers.push(
            <Marker
                key={0}
                coordinates={this.state.property.location.coordinates}
                anchor='bottom'
            >
                <img className='marker' src={locationPin} />
            </Marker>);

        var assets: any = [];
        this.state.assets.forEach((asset) => {
            assets.push(<TileAsset key={asset.id} asset={asset} />);
        });

        return (
            <div className='route-container property-route'>
                <div className='header-spacer'>
                    &nbsp;
                </div>
                <div className='route-content content'>
                    <div className='property-detail'>
                        <StickyContainer>
                            <Sticky>
                                {({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }: any) => {

                                    return <div style={style}>
                                        <div className='sticky-container'>
                                            <Button className='sticky-button' text='Back' state={IButtonState.default} action={() => { store.dispatch(goBack()); }} isLoading={false} />
                                            <Button className='sticky-button' text='Save' state={IButtonState.default} action={() => { store.dispatch(goBack()); }} isLoading={false} />
                                            <Button className='sticky-button' text='Like' state={IButtonState.default} action={() => { store.dispatch(goBack()); }} isLoading={false} />
                                        </div>
                                    </div>;
                                }}
                            </Sticky>

                            <div className='main-info'>
                                <h1 className='name'>{this.state.property.name}</h1>
                                <h2 className='description'>{this.state.property.description}</h2>
                            </div>
                            <div className='amenities'>
                                <h1 className='title'>Amenities</h1>
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
                            <div className='location'>
                                <h1 className='title'>Location</h1>
                                <div className='map'>
                                    <Map
                                        style='mapbox://styles/mapbox/streets-v9'
                                        containerStyle={{
                                            height: '100%',
                                            width: '100%'
                                        }}
                                        center={this.state.mapOptions.center}
                                        zoom={this.state.mapOptions.zoom}
                                    >
                                        <Cluster ClusterMarkerFactory={this.clusterMarker}>
                                            {
                                                markers
                                            }
                                        </Cluster>
                                    </Map>
                                </div>
                            </div>
                            <div className='assets'>
                                <h1 className='title'>Assets</h1>
                                <div className='assets-list'>
                                    <Tiles list={assets} empty={<EmptySearch text={'There\'s no asset found within this property.'} />} />
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