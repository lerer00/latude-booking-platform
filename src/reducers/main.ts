import { combineReducers } from 'redux';
import homeReducer from '../containers/home/reducer';
import propertiesReducer from '../containers/properties/reducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  'home': homeReducer,
  'properties': propertiesReducer,
  'router': routerReducer
});