import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from './Login.jsx';
import Sidebar from './Sidebar.jsx';


const App = ({ store }) => (
  <div>
      <Provider store={store}>
        <Sidebar/>
      </Provider>
  </div>
)

export default App;
