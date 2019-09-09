import React from 'react';
import ReactDOM from 'react-dom';

import WebFont from 'webfontloader';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

WebFont.load({
    google: {
        families: ['Roboto Web:300,400,700', 'sans-serif']
    }
});
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
