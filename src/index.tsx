import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { IntlProvider } from 'react-intl';
const { Web3Provider } = require('react-web3');
import './index.css';
import './calendarEnhancer.css';
import './modalEnhancer.css';

ReactDOM.render(
    <Web3Provider>
        <IntlProvider locale='en'>
            <App />
        </IntlProvider>
    </Web3Provider>,
    document.getElementById('root') as HTMLElement
);