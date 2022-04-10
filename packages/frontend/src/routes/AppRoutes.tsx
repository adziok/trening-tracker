import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../App';
import AuthorizationPage from '../pages/AuthorizationPage';
import { AuthorizationSuccessPage } from '../pages/AuthorizationSuccessPage';
import { AuthorizationFailedPage } from '../pages/AuthorizationFailedPage';
import { Links } from './Links';
import { AccountPage } from '../pages/AccountPage';
import { PlaygroundPage } from '../pages/PlaygroudPage';
import { TrainingsPage } from '../pages/training/TrainingsPage';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={Links.HOME_PAGE} element={<App />} />
            <Route path={Links.ACCOUNT_PAGE} element={<AccountPage />} />
            <Route path={Links.AUTHORIZATION_PAGE} element={<AuthorizationPage />} />
            <Route path={Links.AUTHORIZATION_SUCCESS_PAGE} element={<AuthorizationSuccessPage />} />
            <Route path={Links.AUTHORIZATION_FAILURE_PAGE} element={<AuthorizationFailedPage />} />
            <Route path={Links.TRAININGS} element={<TrainingsPage />} />
            <Route path={Links.PLAYGROUND} element={<PlaygroundPage />} />
        </Routes>
    );
};
