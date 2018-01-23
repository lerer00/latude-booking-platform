import * as React from 'react';
import './index.css';

const DateRange = require('react-date-range').DateRange;
const moment = require('moment');
const Modal = require('react-modal');
import { Button, IButtonState } from '../../button';
// import { FormattedPlural } from 'react-intl';
const ReactMapboxGl = require('react-mapbox-gl').default;
const Layer = require('react-mapbox-gl').Layer;
const Feature = require('react-mapbox-gl').Feature;
const location = require('../../img/ego/location-1.svg');
const calendarAdd = require('../../img/ego/calendar-add.svg');
const closeHexagon = require('../../img/ego/close-hexagon.svg');
// const filter = require('../../img/ego/filter-1.svg');

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibGVyZXIwMCIsImEiOiJjamNvNTI3MzkxdmFnMnJuM2licjNsYmM3In0.sR6op3azARBpWg_-JkDf-Q',
  attributionControl: false,
  logoPosition: 'top-left'
});

const datetimepickerModalStyles = {
  content: {
    padding: '16px',
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    overflow: 'none',
    borderRadius: '3px',
    borderColor: '#C0C0C0',
    boxShadow: '3px 3px 15px #7F7F7F',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    zIndex: '10',
    backgroundColor: 'rgba(0, 0, 0, 0.25)'
  }
};

export namespace Default {
  export interface Props {
    // empty
  }

  export interface State {
    viewMode: ViewMode;
    datetimepickerRange: any;
    datetimepickerVisible: boolean;
    radiusCenter: Array<number>;
  }
}

export enum ViewMode {
  FORM = 1,
  LIST = 2
}

class Default extends React.Component<Default.Props, Default.State> {
  constructor(props?: Default.Props, context?: any) {
    super(props, context);

    this.state = {
      viewMode: ViewMode.FORM,
      datetimepickerRange: {
        startDate: moment(),
        endDate: moment().day(2)
      },
      datetimepickerVisible: false,
      radiusCenter: [0, 0],
    };

    this.handleDatetimepickerChange = this.handleDatetimepickerChange.bind(this);
    this.openDatetimepickerModal = this.openDatetimepickerModal.bind(this);
    this.closeDatetimepickerModal = this.closeDatetimepickerModal.bind(this);
    this.updateAvailabilities = this.updateAvailabilities.bind(this);
  }

  onMapMove(map: any, event: React.SyntheticEvent<any>) {
    let center = map.getCenter();
    this.setState({
      radiusCenter: [center.lng, center.lat]
    });
  }

  handleDatetimepickerChange(range: any) {
    this.setState({
      datetimepickerRange: range
    });
  }

  openDatetimepickerModal() {
    this.setState({
      datetimepickerVisible: true
    });
  }

  closeDatetimepickerModal() {
    this.setState({
      datetimepickerVisible: false
    });
  }

  updateAvailabilities() {
    if (this.state.viewMode === 1) {
      this.setState({
        viewMode: ViewMode.LIST
      });
    } else {
      this.setState({
        viewMode: ViewMode.FORM
      });
    }
  }

  render() {
    var datetimepickerRangeText = this.state.datetimepickerRange.startDate.format('dddd, D MMMM YYYY') + ' till ' + this.state.datetimepickerRange.endDate.format('dddd, D MMMM YYYY');

    var viewMode = '';
    if (this.state.viewMode === ViewMode.LIST) {
      viewMode = 'mode-list';
    } else {
      viewMode = 'mode-form';
    }

    return (
      <div className='default'>
        <div className='content'>
          <Modal
            isOpen={this.state.datetimepickerVisible}
            onRequestClose={this.closeDatetimepickerModal}
            style={datetimepickerModalStyles}
            contentLabel='Modal'
          >
            <div className='modal-header'>
              <h1 className='title'>Manage asset</h1>
              <img className='close' src={closeHexagon} onClick={this.closeDatetimepickerModal} />
            </div>
            <div className='modal-content'>
              <img className='visual-tip' src={calendarAdd} />
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <DateRange
                calendars={1}
                startDate={this.state.datetimepickerRange.startDate}
                endDate={this.state.datetimepickerRange.endDate}
                onInit={this.handleDatetimepickerChange}
                onChange={this.handleDatetimepickerChange}
              />
            </div>
            <div className='modal-actions'>
              <button className='action' onClick={this.closeDatetimepickerModal}>Save</button>
              <button className='action close' onClick={this.closeDatetimepickerModal}>Close</button>
            </div>
          </Modal>
          <div className='filters'>
            <div className='date-selector'>
              <input className='viewer' type='text' readOnly={true} placeholder={'When is you next adventure?'} value={datetimepickerRangeText} />
              <button className='selector' onClick={this.openDatetimepickerModal}>
                <img className='calendar-logo' src={calendarAdd} />
              </button>
            </div>
            <Button
              id='update-availabilities-button'
              text='Update availabilities'
              state={IButtonState.default}
              action={this.updateAvailabilities}
            />
          </div>
          <div className={`map ${viewMode}`}>
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
          <div className={`listing ${viewMode}`}>
            <div className='properties'>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          {/* <div className='booking-grid-container'>
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
          </div> */}
        </div>
      </div>
    );
  }
}

export default Default;
