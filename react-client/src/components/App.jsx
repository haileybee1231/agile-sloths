import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from './Login.jsx';

const App = ({ store }) => (
  <div>
    <LoginForm/>
      <Provider store={store}>
        <h1>Grassroots</h1>
      </Provider>
  </div>
)

export default App;
