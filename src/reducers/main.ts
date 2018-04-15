import { combineReducers } from 'redux';
import homeReducer from '../containers/home/reducer';

export default combineReducers({
  'home': homeReducer
});