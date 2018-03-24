import * as React from 'react';
import './index.css';
import axios, { AxiosResponse } from 'axios';
import {
    bookShelf, computerPc, disableSign, forkSpoon,
    lockKey, networkWifiSignal, petAllow, presentation,
    smokeFreeArea, locations, locationPin, cursorHand
} from '../../img/index';
import Tiles from '../../components/tiles';
import TileAsset from '../../components/tile/asset';
import IProperty from '../../model/property';
import IAsset from '../../model/asset';

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
                active: false,
                location: {
                    coordinates: [0, 0],
                    type: ''
                },
                name: '',
                description: '',
                rating: 0,
                comments: [],
                parent: ''
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

        var emptyAssets = (
            <div className='tile tile-empty'>
                <div>
                    <img src={cursorHand} className='tile-empty-image' />
                </div>
                <div className='tile-empty-content'>
                    <h1 className='tile-empty-content-title'>Nothing...</h1>
                    <p className='tile-empty-content-message'>There's no asset found within this property.</p>
                </div>
            </div>
        );

        return (
            <div className='route-container property'>
                <div className='route-content content'>
                    <div className='main-info'>
                        <h1 className='name'>{this.state.property.name}</h1>
                        <h2 className='description'>{this.state.property.description}</h2>
                    </div>
                    <div className='ammenities'>
                        <h1 className='title'>Ammenities</h1>
                        <ol className='list'>
                            <li className='ammenity'>
                                <img src={bookShelf} />
                                <span>Library</span>
                            </li>
                            <li className='ammenity'>
                                <img src={computerPc} />
                                <span>Computers</span>
                            </li>
                            <li className='ammenity'>
                                <img src={disableSign} />
                                <span>Facility for disable guests</span>
                            </li>
                            <li className='ammenity'>
                                <img src={lockKey} />
                                <span>Lockers</span>
                            </li>
                            <li className='ammenity'>
                                <img src={forkSpoon} />
                                <span>Restaurant on place</span>
                            </li>
                            <li className='ammenity'>
                                <img src={networkWifiSignal} />
                                <span>Wifi available</span>
                            </li>
                            <li className='ammenity'>
                                <img src={petAllow} />
                                <span>Pets are allowed</span>
                            </li>
                            <li className='ammenity'>
                                <img src={presentation} />
                                <span>Conference venues</span>
                            </li>
                            <li className='ammenity'>
                                <img src={smokeFreeArea} />
                                <span>Smoke free area</span>
                            </li>
                        </ol>
                    </div>
                    <div className='gallery'>
                        <h1 className='title'>Photo gallery</h1>
                        <div className='grid'>
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
                            <img src='https://source.unsplash.com/random/200x200' />
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
                            <Tiles list={assets} empty={emptyAssets} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Property;