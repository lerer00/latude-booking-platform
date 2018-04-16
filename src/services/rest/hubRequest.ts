import axios, { AxiosResponse } from 'axios';
import { push } from 'react-router-redux';
import { IProperty } from '../../models/property';
import store from '../../store';

class HubRequest {
    public getProperties() {
        axios.get(process.env.REACT_APP_HUB_URL + '/properties').then((response: AxiosResponse<Array<IProperty>>) => {
            store.dispatch({ type: 'home/SEARCH_FINDER_SUCCESS', payload: response.data });
            store.dispatch(push('/properties'));
        }).catch((error: any) => {
            store.dispatch({ type: 'home/SEARCH_FINDER_ERROR', payload: [] });
        });
    }

    // public getProperty(id: string) {
    //     axios.get(process.env.REACT_APP_HUB_URL + '/properties' + id).then((response: AxiosResponse<Array<IProperty>>) => {
    //         store.dispatch({ type: 'home/SEARCH_FINDER_SUCCESS', payload: response.data });
    //     }).catch((error: any) => {
    //         store.dispatch({ type: 'home/SEARCH_FINDER_ERROR', payload: [] });
    //     });
    // }
}

export default HubRequest;