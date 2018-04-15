import * as t from './actionTypes';

export const updateFinderAction = (prop: string, value: string) => ({
    type: t.UPDATE_FINDER,
    payload: {
        prop,
        value,
    }
}); 

export const searchFinderAction = () => ({
    type: t.SEARCH_FINDER,
    payload: null
}); 

export const searchFinderSuccessAction = (properties: Array<any>) => ({
    type: t.SEARCH_FINDER_SUCCESS,
    payload: properties
}); 

export const searchFinderErrorAction = (error: any) => ({
    type: t.SEARCH_FINDER_ERROR,
    payload: error
}); 