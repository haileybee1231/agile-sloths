import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import store from './store/index.js';

ReactDOM.render(<App store={store}/>, document.getElementById('mount'));
