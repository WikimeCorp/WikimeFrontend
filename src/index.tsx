import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <StrictMode>    
    <Provider store={store}>
      <BrowserRouter>
        <App />      
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
