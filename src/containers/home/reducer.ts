import * as t from './actionTypes';
import { AnyAction } from 'redux';
import { State } from './model';
import hub from '../../services/rest/hubRequest';

var moment = require('moment');

const initialState: State = {
    isLoading: false,
    finder: {
        destination: '',
        dateRange: {
            startDate: moment(),
            endDate: moment().add(3, 'days')
        }
    }
};

export default (state = initialState, action: AnyAction): State => {
    const update = (payload: {}, stateArg = state) => Object.assign({}, stateArg, payload);
    const isLoading = (stateArg = state) => update({ isLoading: true }, state);
    // const resetFinder = (stateArg = state) => update({ newCompany: initialState.finder }, state);

    switch (action.type) {
        case t.UPDATE_FINDER:
            const updatedFinder = Object.assign({}, state.finder, { [action.payload.prop]: action.payload.value });
            return update({ finder: updatedFinder });
        case t.SEARCH_FINDER:
            var h = new hub();
            h.getProperties();
            return isLoading();
        case t.SEARCH_FINDER_SUCCESS:
            return update({
                properties: action.payload,
                isLoading: false,
            });
        case t.SEARCH_FINDER_ERROR:
            return update({
                properties: action.payload,
                isLoading: false,
            });
        default:
            return state;
    }
};