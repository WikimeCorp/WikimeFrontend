import ReactDOM from 'react-dom';
import App from './App';
import "./styles/App.css"
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
// import reportWebVitals from './reportWebVitals';

const store = setupStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
