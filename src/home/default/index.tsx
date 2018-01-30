import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import './index.css';
import TileProperty from '../../tile/property';
import { Button, IButtonState } from '../../button';
import IProperty from '../../model/property';

const DateRange = require('react-date-range').DateRange;
const moment = require('moment');
const Modal = require('react-modal');
const ReactMapboxGl = require('react-mapbox-gl').default;
// const Layer = require('react-mapbox-gl').Layer;
// const Feature = require('react-mapbox-gl').Feature;
const Marker = require('react-mapbox-gl').Marker;
const location = require('../../img/ego/location-1.svg');
const building = require('../../img/ego/building-1.svg');
const calendarAdd = require('../../img/ego/calendar-add.svg');
const closeHexagon = require('../../img/ego/close-hexagon.svg');

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
    mapOptions: any;
    propertiesList: Array<IProperty>;
  }
}

export enum ViewMode {
  FORM = 1,
  LIST = 2,
  HYBRID = 3,
}

class Default extends React.Component<Default.Props, Default.State> {
  constructor(props?: Default.Props, context?: any) {
    super(props, context);

    this.state = {
      viewMode: ViewMode.FORM,
      datetimepickerRange: {
        startDate: moment(),
        endDate: moment().add(2, 'day')
      },
      datetimepickerVisible: false,
      radiusCenter: [0, 0],
      mapOptions: {
        zoom: [8],
        center: [-71.4817734, 46.856283]
      },
      propertiesList: []
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

  onMapClick(map: any, event: React.SyntheticEvent<any>) {
    if (this.state.viewMode === ViewMode.LIST) {
      this.setState({
        viewMode: ViewMode.HYBRID
      });
    }
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
    this.updateViewMode();

    axios.get('http://localhost:3001/properties', {
      params: {
        center: JSON.stringify(this.state.radiusCenter)
      }
    }).then((response: AxiosResponse<Array<IProperty>>) => {
      this.setState({
        propertiesList: response.data
      });
    }).catch((error: any) => {
      console.log(error);
    });
  }

  updateViewMode() {
    switch (this.state.viewMode) {
      case ViewMode.FORM:
      case ViewMode.HYBRID:
        this.setState({
          viewMode: ViewMode.LIST
        });
        break;
      case ViewMode.LIST:
        return;
      default:
        this.setState({
          viewMode: ViewMode.FORM
        });
        break;
    }
  }

  render() {
    var datetimepickerRangeText = this.state.datetimepickerRange.startDate.format('dddd, D MMMM YYYY') + ' till ' + this.state.datetimepickerRange.endDate.format('dddd, D MMMM YYYY');

    var viewMode = '';
    switch (this.state.viewMode) {
      case ViewMode.LIST:
        viewMode = 'mode-list';
        break;
      case ViewMode.FORM:
        viewMode = 'mode-form';
        break;
      case ViewMode.HYBRID:
        viewMode = 'mode-hybrid';
        break;
      default:
        viewMode = 'mode-form';
        break;
    }

    var properties: any = [];
    var markers: any = [];
    if (this.state.viewMode === ViewMode.HYBRID || this.state.viewMode === ViewMode.LIST) {
      this.state.propertiesList.map((property, index) => {
        properties.push(<TileProperty property={property} />);
        markers.push(
          <Marker
            key={index}
            coordinates={property.location.coordinates}
            anchor='bottom'
          >
            <img className='marker' src={building} />
          </Marker>);
      });
    }

    return (
      <div className='route-container default' >
        <div className=' route-content content'>
          <Modal
            isOpen={this.state.datetimepickerVisible}
            onRequestClose={this.closeDatetimepickerModal}
            style={datetimepickerModalStyles}
            contentLabel='Modal'
          >
            <div className='modal-header'>
              <h1 className='title'>Date Selector</h1>
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
              id='search-properties-button'
              text='Search properties'
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
              center={this.state.mapOptions.center}
              zoom={this.state.mapOptions.zoom}
              onMove={(map: any, event: React.SyntheticEvent<any>) => { this.onMapMove(map, event); }}
              onClick={(map: any, event: React.SyntheticEvent<any>) => { this.onMapClick(map, event); }}
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
              {markers}
            </Map>
          </div>
          <div className={`listing ${viewMode}`}>
            <div className='properties-tiles'>
              {properties}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Default;
