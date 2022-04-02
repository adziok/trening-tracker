import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import './tailwind.output.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthorizationPage from './pages/AuthorizationPage';
import { AuthorizationSuccessPage } from './pages/AuthorizationSuccessPage';
import { AuthorizationFailedPage } from './pages/AuthorizationFailedPage';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/authorization" element={<AuthorizationPage />} />
                <Route path="/authorization/success" element={<AuthorizationSuccessPage />} />
                <Route path="/authorization/failure" element={<AuthorizationFailedPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
