import * as React from 'react';
import '../index.css';
import './index.css';
import Rating from '../../rating';
import { IProperty } from '../../../models/property';
import { FormattedPlural } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { locationMap, groupChat, calendarCheck, arrowNext } from '../../../img/index';

export namespace PropertyTile {
    export interface Props {
        property: IProperty;
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
            id: '',
            name: '',
            description: '',
            rating: 0,
            comments: [],
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
            active: true,
            parent: '',
            location: {
                coordinates: [0, 0],
                type: 'point',
            }
        }
    };

    render() {
        let isLit = null;
        if (this.props.property.rating > 4) {
            isLit = <span className='is-lit'>🔥</span>;
        }

        return (
            <div className='tile tile-property' key={this.props.property.id}>
                <div className='tile-property-grid'>
                    <div className='tile-property-thumbnail'>
                        <img src='https://source.unsplash.com/random/400x400' />
                    </div>
                    <div className='tile-property-content'>
                        <h1 className='tile-property-name'>{isLit} {this.props.property.name}</h1>
                        <p className='tile-property-description'>
                            {this.props.property.description}
                            <NavLink className='link' to={'/properties/' + this.props.property.id} >
                                more details <img src={arrowNext} />
                            </NavLink>
                        </p>
                        <Rating max={5} score={this.props.property.rating} />
                    </div>
                    <div className='tile-property-details'>
                        <p className='tile-property-price'>
                            <span>[149.99$ to 148.99$]</span>
                        </p>
                        <div className='tile-property-actions'>
                            <p className='tile-property-comments'>
                                <a>
                                    {this.props.property.comments.length}&nbsp;
                                    <FormattedPlural
                                        value={this.props.property.comments.length}
                                        one='comment'
                                        other='comments'
                                    />
                                </a>
                                <img src={groupChat} />
                            </p>
                            <p className='tile-property-location'>
                                <a>see on map</a>
                                <img src={locationMap} />
                            </p>
                            <p className='tile-property-check-availabilities'>
                                <a>check rooms</a>
                                <img src={calendarCheck} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyTile;