import * as React from 'react';
import './index.css';

const DateRange = require('react-date-range').DateRange;
const moment = require('moment');
import { Button, IButtonState } from '../../button';
import { FormattedPlural } from 'react-intl';
const ReactMapboxGl = require('react-mapbox-gl').default;
const Layer = require('react-mapbox-gl').Layer;
const Feature = require('react-mapbox-gl').Feature;
const location = require('../../img/ego/location-1.svg');

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
  }
}

class Default extends React.Component<Default.Props, Default.State> {
  constructor(props?: Default.Props, context?: any) {
    super(props, context);

    this.state = {
      dateRange: {
        startDate: moment(),
        endDate: moment().day(2)
      },
      radiusCenter: [0, 0]
    };

    this.handleDateRangeSelect = this.handleDateRangeSelect.bind(this);
    this.handleSearchAction = this.handleSearchAction.bind(this);
  }

  handleDateRangeSelect(range: any) {
    console.log(range);
    this.setState({
      dateRange: range
    });
  }

  handleSearchAction() {
    console.log('searching...');
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
            <div className='booking-grid-item'>
              <DateRange
                calendars={1}
                startDate={this.state.dateRange.startDate}
                endDate={this.state.dateRange.endDate}
                onInit={this.handleDateRangeSelect}
                onChange={this.handleDateRangeSelect}
              />
            </div>
            <div className='booking-grid-item'>
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
              <Button
                text='Search'
                state={IButtonState.default}
                action={this.handleSearchAction}
              />
            </div>
            {/* <div className='booking-grid-item check-in'>
              <p className='check-label'>Check-in</p>
              <p className='check-date'>
                <span className='days'>{
                  this.state.dateRange.startDate &&
                  this.state.dateRange.startDate.format('dddd').toString()
                }</span>
                <span className='day'>{
                  this.state.dateRange.startDate &&
                  this.state.dateRange.startDate.format('D').toString()
                }</span>
                <span className='month'>{
                  this.state.dateRange.startDate &&
                  this.state.dateRange.startDate.format('MMMM').toString()
                }</span>
                <span className='year'>{
                  this.state.dateRange.startDate &&
                  this.state.dateRange.startDate.format('YYYY').toString()
                }</span>
              </p>
            </div>
            <div className='booking-grid-item check-out'>
              <p className='check-label'>Check-out</p>
              <p className='check-date'>
                <span className='days'>{
                  this.state.dateRange.endDate &&
                  this.state.dateRange.endDate.format('dddd').toString()
                }</span>
                <span className='day'>{
                  this.state.dateRange.endDate &&
                  this.state.dateRange.endDate.format('D').toString()
                }</span>
                <span className='month'>{
                  this.state.dateRange.endDate &&
                  this.state.dateRange.endDate.format('MMMM').toString()
                }</span>
                <span className='year'>{
                  this.state.dateRange.endDate &&
                  this.state.dateRange.endDate.format('YYYY').toString()
                }</span>
              </p>
            </div> */}
            <div className='booking-grid-item booking-grid-item-map'>
              <img className='location' src={location} />

              <Map
                style='mapbox://styles/mapbox/streets-v9'
                containerStyle={{
                  height: '100%',
                  width: '100%'
                }}
                onMove={(map: any, event: React.SyntheticEvent<any>) => { this.onMapMove(map, event); }}
              >
                <Layer
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
                </Layer>
              </Map>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Default;
