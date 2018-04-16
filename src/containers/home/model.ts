import { Moment } from 'moment';

export type FinderModel = {
    destination: string;
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