import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from './Login.jsx';

const App = ({ store }) => { // pass store to app
  return (
    <Provider store={store}>
      <div>
          <LoginForm />
        </div>
    </Provider>
  )
}

export default App;
