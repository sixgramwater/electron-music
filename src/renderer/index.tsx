import { render } from 'react-dom';
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

render(
  <Provider store={store}>
    <Router hashType="noslash">
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
