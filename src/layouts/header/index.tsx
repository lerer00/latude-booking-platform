import * as React from 'react';
import { history } from '../../store';
import { NavLink } from 'react-router-dom';
import './index.css';

enum HeaderBackgroundColor {
    transparent = 0,
    blue = 1
}

export namespace Header {
    export interface Props {
        // empty
    }

    export interface State {
        backgroundColor: HeaderBackgroundColor;
    }
}

class Header extends React.Component<Header.Props, Header.State> {
    constructor(props?: Header.Props, context?: any) {
        super(props, context);

        var backgroundColor = HeaderBackgroundColor.blue;
        if (history.location.pathname === '/') {
            backgroundColor = HeaderBackgroundColor.transparent;
        }

        this.state = {
            backgroundColor: backgroundColor
        };

        history.listen((location) => {
            if (location.pathname === '/') {
                this.setState({
                    backgroundColor: HeaderBackgroundColor.transparent
                });
            } else {
                this.setState({
                    backgroundColor: HeaderBackgroundColor.blue
                });
            }
        });
    }

    getBackgroundColorClass() {
        switch (this.state.backgroundColor) {
            case HeaderBackgroundColor.transparent:
                return 'transparent';
            case HeaderBackgroundColor.blue:
                return 'blue';
            default:
                return 'blue';
        }
    }

    render() {
        return (
            <header className={`header ${this.getBackgroundColorClass()}`}>
                <div className='container'>
                    <div className='left content'>
                        <NavLink className='title' to={'/'} >
                            latude
                        </NavLink>
                        <p className='subtitle'>booking</p>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;