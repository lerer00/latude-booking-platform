import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { IntlProvider } from 'react-intl';
import './index.css';
import './calendarEnhancer.css';

ReactDOM.render(
    <IntlProvider locale='en'>
        <App />
    </IntlProvider>,
    document.getElementById('root') as HTMLElement
);