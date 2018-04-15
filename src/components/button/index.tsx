import * as React from 'react';
import Spinner from '../spinner';
import './index.css';

export namespace Button {
    export interface Props extends IButton {
        // empty
    }

    export interface State {
        // empty
    }

    export interface Context {
        // empty
    }
}

export interface IButton {
    text: string;
    state: IButtonState;
    action: Function;
    isLoading: boolean;
}

export enum IButtonState {
    default = 0,
    success = 1,
    error = 2,
    warning = 3,
    info = 4
}

export class Button extends React.Component<Button.Props & React.HTMLAttributes<HTMLDivElement>, Button.State> {
    constructor(props?: Button.Props, context?: Button.Context) {
        super(props, context);

        this.executeAction = this.executeAction.bind(this);
    }

    executeAction() {
        this.props.action();
    }

    render() {
        var wantedStyles = undefined;
        switch (this.props.state) {
            case IButtonState.default:
                wantedStyles = 'button default';
                break;
            case IButtonState.success:
                wantedStyles = 'button success';
                break;
            case IButtonState.error:
                wantedStyles = 'button error';
                break;
            case IButtonState.warning:
                wantedStyles = 'button warning';
                break;
            case IButtonState.info:
                wantedStyles = 'button info';
                break;
            default:
                wantedStyles = 'button default';
                break;
        }

        var content;
        if (this.props.isLoading) {
            content = <Spinner text='' />;
        } else {
            content = <span className='button-text'>{this.props.text}</span>;
        }

        return (
            <button className={`${wantedStyles} ${this.props.className}`} onClick={() => this.executeAction()}>
                {content}
            </button>
        );
    }
}