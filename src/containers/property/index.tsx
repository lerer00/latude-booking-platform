import * as React from 'react';
import './index.css';
import axios, { AxiosResponse } from 'axios';
import { bookShelf, computerPc, disableSign, forkSpoon, lockKey, networkWifiSignal, petAllow, presentation, smokeFreeArea } from '../../img/index';
import IProperty from '../../model/property';

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
            mapOptions: {
                zoom: [8],
                center: [0, 0]
            }
        };
    }

    componentWillMount() {
        axios.get(process.env.REACT_APP_HUB_URL + '/properties/' + this.props.match.params.pid).then((response: AxiosResponse<IProperty>) => {
            this.setState({
                property: response.data
            });
        }).catch((error: any) => {
            console.log(error);
        });
    }

    render() {
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
                                <span>wifi available</span>
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Property;