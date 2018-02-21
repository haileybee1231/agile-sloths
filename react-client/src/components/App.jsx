import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

const App = ({ store }) => (
  <Provider store={store}>
    <h1>Grassroots</h1>
  </Provider>
)

export default App;
