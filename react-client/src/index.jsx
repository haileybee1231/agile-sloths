// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App.jsx';
// import store from './store/index.js';

// ReactDOM.render(<App store={store}/>, document.getElementById('mount'));


import React from 'react'
import { render } from 'react-dom'
import Root from './components/Root.jsx'
import store from './store/index.js';

render(
  <Root store={store} />,
  document.getElementById('mount')
)