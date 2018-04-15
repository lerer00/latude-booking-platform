import * as React from 'react';
import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';
import './index.css';

export namespace Select {
    export interface Props extends ISelect {
        // empty
    }

    export interface State {
        // empty
    }

    export interface Context {
        // empty
    }
}

export interface ISelect {
    value: string;
    placeholder: string;
    state: ISelectState;
    searchable: boolean;
    clearable: boolean;
    options: Array<any>;
    onChange: Function;
}

export enum ISelectState {
    default = 0,
    success = 1,
    error = 2,
    warning = 3,
    info = 4
}

export class Select  extends React.Component<Select.Props & React.HTMLAttributes<HTMLDivElement>> {
    constructor() {
        super();
    }

    render() {
        var wantedStyles = undefined;
        switch (this.props.state) {
            case ISelectState.default:
                wantedStyles = 'select-default';
                break;
            case ISelectState.success:
                wantedStyles = 'select-success';
                break;
            case ISelectState.error:
                wantedStyles = 'select-error';
                break;
            case ISelectState.warning:
                wantedStyles = 'select-warning';
                break;
            case ISelectState.info:
                wantedStyles = 'select-info';
                break;
            default:
                wantedStyles = 'select-default';
                break;
        }

        return (
            <ReactSelect
                className={`${wantedStyles} ${this.props.className}`}
                value={this.props.value}
                placeholder={this.props.placeholder}
                searchable={this.props.searchable}
                clearable={this.props.clearable}
                options={this.props.options}
                onChange={this.props.onChange}
            />
        );
    }
}