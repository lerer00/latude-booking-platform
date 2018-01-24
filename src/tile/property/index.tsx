import * as React from 'react';
import '../index.css';
import './index.css';
import Rating from '../../rating';
import { FormattedPlural } from 'react-intl';

const locationMap = require('../../img/ego/location-map.svg');
const groupChat = require('../../img/ego/group-chat.svg');

export namespace PropertyTile {
    export interface Props {
        property?: any;
    }

    export interface State {
        // empty
    }
}

class PropertyTile extends React.Component<PropertyTile.Props, PropertyTile.State> {
    constructor() {
        super();
    }

    public static defaultProps: Partial<PropertyTile.Props> = {
        property: {
            isLit: true,
            name: 'The Watergate...',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
                'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
                'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.',
            price: 250.52,
            currency: 'CAD',
            location: {
                type: 'point',
                coordinates: []
            },
            rating: 3.57,
            comments: [
                {
                    firstname: 'John',
                    lastname: 'Doe',
                    rating: 4,
                    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
                        'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                }
            ]
        }
    };

    render() {
        let isLit = null;
        if (this.props.property.isLit) {
            isLit = <span className='is-lit'>🔥</span>;
        }

        return (
            <div className='tile tile-property'>
                <div className='tile-property-grid'>
                    <div className='tile-property-thumbnail'>
                        <img src='./assets/img/hotel-thumbnail.jpg' />
                    </div>
                    <div className='tile-property-content'>
                        <h1 className='tile-property-name'>{isLit} {this.props.property.name}</h1>
                        <p className='tile-property-description'>{this.props.property.description}</p>
                        <Rating max={5} score={this.props.property.rating} />
                    </div>
                    <div className='tile-property-details'>
                        <p className='tile-property-price'>
                            <span>{this.props.property.price} {this.props.property.currency}</span>
                        </p>
                        <p className='tile-property-comments'>
                            {this.props.property.comments.length}&nbsp;
                            <FormattedPlural
                                value={this.props.property.comments.length}
                                one='comment'
                                other='comments'
                            />
                            <img src={groupChat} />
                        </p>
                        <p className='tile-property-location'>
                            <span>See on map<img src={locationMap} /></span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyTile;