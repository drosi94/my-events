import React from 'react';
import ReactDOM from 'react-dom';

import WebFont from 'webfontloader';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

WebFont.load({
    google: {
        families: ['Roboto', 'sans-serif']
    }
});
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
