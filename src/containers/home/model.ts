import { Moment } from 'moment';
import { Destination } from '../../components/finder';

export type FinderModel = {
    destination: Destination;
    dateRange: {
        startDate: Moment;
        endDate: Moment;
    }
};

export type Context = {
    web3: {};
};

export interface State {
    isLoading: boolean;
    properties: Array<any>;
    finder: FinderModel;
}

export type Props = State & {
    updateFinder: (prop: string, value: any) => void;
    searchFinder: () => void;
};