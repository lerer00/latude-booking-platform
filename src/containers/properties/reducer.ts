import { AnyAction } from 'redux';
import { State } from './model';

const initialState: State = {
    isLoading: false,
    properties: []
};

export default (state = initialState, action: AnyAction): State => {
    switch (action.type) {
        default:
            return state;
    }
};