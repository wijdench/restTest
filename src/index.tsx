import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import App from './app/App';
import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName('base')[0]?.getAttribute('href') || '/';

ReactDOM.render(
  <HashRouter basename={baseUrl}>
    <CssBaseline />
    <App />
  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
