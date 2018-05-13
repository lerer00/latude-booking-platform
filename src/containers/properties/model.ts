export type Context = {
    web3: {};
};

export interface State {
    isLoading: boolean;
    properties: Array<any>;
}

export type Props = State & {
    updateFinder: (prop: string, value: any) => void;
    searchFinder: () => void;
};