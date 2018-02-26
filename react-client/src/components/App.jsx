import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import LoginForm from './Login.jsx';
import FeedList from './FeedList.jsx'

const App = ({ store }) => (
  <div>
      <Provider store={store}>
        <FeedList/>
      </Provider>
  </div>
)

export default App;
