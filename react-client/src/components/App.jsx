import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from './Login.jsx';

const App = ({ store }) => (
  <div>
      <Provider store={store}>
        <LoginForm/>
      </Provider>
  </div>
)

export default App;
