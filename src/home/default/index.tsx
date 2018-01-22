import * as React from 'react';
import './index.css';

const DateRange = require('react-date-range').DateRange;
const moment = require('moment');
import { Button, IButtonState } from '../../button';
import { FormattedPlural } from 'react-intl';
const ReactMapboxGl = require('react-mapbox-gl').default;
// const Layer = require('react-mapbox-gl').Layer;
// const Feature = require('react-mapbox-gl').Feature;
const location = require('../../img/ego/location-1.svg');
const filter = require('../../img/ego/filter-1.svg');

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibGVyZXIwMCIsImEiOiJjamNvNTI3MzkxdmFnMnJuM2licjNsYmM3In0.sR6op3azARBpWg_-JkDf-Q',
  attributionControl: false,
});

export namespace Default {
  export interface Props {
    // empty
  }

  export interface State {
    dateRange: any;
    radiusCenter: Array<number>;
    geoQueryForm: IGeoQueryForm;
  }
}

export interface IGeoQueryForm {
  value: string;
}

class Default extends React.Component<Default.Props, Default.State> {
  constructor(props?: Default.Props, context?: any) {
    super(props, context);

    this.state = {
      dateRange: {
        startDate: moment(),
        endDate: moment().day(2)
      },
      radiusCenter: [0, 0],
      geoQueryForm: {
        value: ''
      }
    };

    this.handleDateRangeSelect = this.handleDateRangeSelect.bind(this);
    this.handleSearchAction = this.handleSearchAction.bind(this);
    this.handleGeoQueryValueChange = this.handleGeoQueryValueChange.bind(this);
  }

  handleDateRangeSelect(range: any) {
    this.setState({
      dateRange: range
    });
  }

  handleSearchAction() {
    console.log('searching...');
  }

  handleGeoQueryValueChange(event: any) {
    var tmpForm = {
      value: event.target.value
    };

    this.setState({
      geoQueryForm: tmpForm
    });
  }

  onMapMove(map: any, event: React.SyntheticEvent<any>) {
    let center = map.getCenter();
    this.setState({
      radiusCenter: [center.lng, center.lat]
    });
  }

  render() {
    return (
      <div className='default'>
        <div className='content'>
          <div className='booking-grid-container'>
            <div className='booking-grid-item booking-grid-item-calendar'>
              <div className='calendar'>
                <DateRange
                  calendars={2}
                  startDate={this.state.dateRange.startDate}
                  endDate={this.state.dateRange.endDate}
                  onInit={this.handleDateRangeSelect}
                  onChange={this.handleDateRangeSelect}
                />
              </div>
            </div>
            <div className='booking-grid-item'>
              <div className='filters-results'>
                <img className='filters-logo' src={filter} />
                <p className='filters-text'>
                  You are looking for property in the region of <span className='filter-region'>{'London'}</span>
                  from <span className='filter-range'>{this.state.dateRange.startDate.format('dddd, D MMMM YYYY')} till {this.state.dateRange.endDate.format('dddd, D MMMM YYYY')}</span>
                  for a total number of <span className='filter-nights'>
                    {this.state.dateRange.endDate.diff(this.state.dateRange.startDate, 'days') + ' '}
                    <FormattedPlural
                      value={this.state.dateRange.endDate.diff(this.state.dateRange.startDate, 'days')}
                      one='night'
                      other='nights'
                    />
                  </span>.
              </p>
              </div>
            </div>
            <div className='booking-grid-item booking-grid-item-geo-query'>
              <form className='geo-query'>
                <input type='text' placeholder={'What\'s next... where do you want to travel?'} value={this.state.geoQueryForm.value} onChange={this.handleGeoQueryValueChange} />
              </form>
            </div>
            <div className='booking-grid-item booking-grid-item-search'>
              <Button
                text='Search'
                state={IButtonState.default}
                action={this.handleSearchAction}
              />
            </div>
            <div className='booking-grid-item booking-grid-item-map'>
              <img className='location' src={location} />

              <Map
                style='mapbox://styles/mapbox/streets-v9'
                containerStyle={{
                  height: '100%',
                  width: '100%'
                }}
                onMove={(map: any, event: React.SyntheticEvent<any>) => { this.onMapMove(map, event); }}
                onStyleLoad={(map: any, event: React.SyntheticEvent<any>) => { this.onMapMove(map, event); }}
              >
                {/* <Layer
                  id='radius'
                  type='circle'
                  paint={{
                    'circle-radius': 100,
                    'circle-color': '#ffffff',
                    'circle-opacity': 0.3,
                    'circle-pitch-alignment': 'map',
                    'circle-stroke-width': 1.5,
                    'circle-stroke-color': '#399aff'
                  }}
                >
                  <Feature coordinates={this.state.radiusCenter} />
                </Layer> */}
              </Map>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Default;
