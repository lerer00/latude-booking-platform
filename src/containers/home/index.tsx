import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import './index.css';
import Tiles from '../../components/tiles';
import TileProperty from '../../components/tile/property';
import { Button, IButtonState } from '../../components/button';
import { location, locations, locationPin, calendarAdd, closeHexagon, cursorHand } from '../../img/index';
import IProperty from '../../model/property';

const DateRange = require('react-date-range').DateRange;
const moment = require('moment');
const Modal = require('react-modal');
const ReactMapboxGl = require('react-mapbox-gl').default;
const Layer = require('react-mapbox-gl').Layer;
const Feature = require('react-mapbox-gl').Feature;
const Marker = require('react-mapbox-gl').Marker;
const Cluster = require('react-mapbox-gl').Cluster;

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
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

export namespace Home {
  export interface Props {
    // empty
  }

  export interface State {
    viewMode: ViewMode;
    datetimepickerRange: any;
    datetimepickerVisible: boolean;
    isTargetVisible: boolean;
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

class Home extends React.Component<Home.Props, Home.State> {
  constructor(props?: Home.Props, context?: any) {
    super(props, context);

    this.state = {
      viewMode: ViewMode.FORM,
      datetimepickerRange: {
        startDate: moment(),
        endDate: moment().add(2, 'day')
      },
      datetimepickerVisible: false,
      isTargetVisible: true,
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
    this.handleIsTargetVisible = this.handleIsTargetVisible.bind(this);
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

    axios.get(process.env.REACT_APP_HUB_URL + '/properties', {
      params: {
        center: JSON.stringify(this.state.radiusCenter)
      }
    }).then((response: AxiosResponse<Array<IProperty>>) => {
      this.setState({
        isTargetVisible: false,
        propertiesList: response.data
      });
    }).catch((error: any) => {
      console.log(error);
    });
  }

  handleIsTargetVisible() {
    console.log(this.state.isTargetVisible);
    this.setState({
      isTargetVisible: !this.state.isTargetVisible
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

  clusterMarker = (coordinates: any) => (
    <Marker coordinates={coordinates}>
      <img className='marker' src={locations} />
    </Marker>
  )

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

    var emptyProperties = (
      <div className='tile tile-empty'>
        <div>
          <img src={cursorHand} className='tile-empty-image' />
        </div>
        <div className='tile-empty-content'>
          <h1 className='tile-empty-content-title'>Nothing...</h1>
          <p className='tile-empty-content-message'>There's no property found in regard to your criteria. Please select another region. Since we are on a test network not every city are populated.</p>
        </div>
      </div>
    );
    var properties: any = [];
    var markers: any = [];
    if (this.state.viewMode === ViewMode.HYBRID || this.state.viewMode === ViewMode.LIST) {
      this.state.propertiesList.map((property, index) => {
        properties.push(<TileProperty property={property} />);
      });
    }

    var radiusOptions: any = {};
    if (this.state.isTargetVisible) {
      radiusOptions.circleFillOpacity = 0.2;
      radiusOptions.circleStrokeWidth = 1.4;
    } else {
      radiusOptions.circleFillOpacity = 0;
      radiusOptions.circleStrokeWidth = 0;
    }

    this.state.propertiesList.map((property, index) => {
      markers.push(
        <Marker
          key={index}
          coordinates={property.location.coordinates}
          anchor='bottom'
        >
          <img className='marker' src={locationPin} />
        </Marker>);
    });

    return (
      <div className='route-container default-route' >
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
              <div className='visual-tip'>
                <img className='tip' src={calendarAdd} />
              </div>
              <p className='description'>
                Choose the first and last night of your stay with the below calendar. Note that the last night is included.
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
              <button className='button' onClick={this.closeDatetimepickerModal}>Save</button>
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
              text='Search properties'
              state={IButtonState.default}
              action={this.updateAvailabilities}
            />
          </div>
          <div className={`map ${viewMode}`}>
            {this.state.isTargetVisible && <img className='location' src={location} />}
            <form className='toggle-target'>
              <label htmlFor='toggle'>
                <input type='checkbox' id='toggle' checked={this.state.isTargetVisible} onChange={this.handleIsTargetVisible} /> toggle target
              </label>
            </form>
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
              <Layer
                id='radius'
                type='circle'
                paint={{
                  'circle-radius': 100,
                  'circle-color': '#ffffff',
                  'circle-opacity': radiusOptions.circleFillOpacity,
                  'circle-pitch-alignment': 'map',
                  'circle-stroke-width': radiusOptions.circleStrokeWidth,
                  'circle-stroke-color': '#399aff'
                }}
              >
                <Feature coordinates={this.state.radiusCenter} />
              </Layer>
              <Cluster ClusterMarkerFactory={this.clusterMarker}>
                {
                  markers
                }
              </Cluster>
            </Map>
          </div>
          <div className={`listing ${viewMode}`}>
            <div className='properties-tiles'>
              <Tiles list={properties} empty={emptyProperties} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
