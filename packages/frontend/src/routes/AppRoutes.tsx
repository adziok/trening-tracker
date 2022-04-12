import React from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AuthorizationPage from '../pages/AuthorizationPage';
import { Links } from './Links';
import { AccountPage } from '../pages/AccountPage';
import { PlaygroundPage } from '../pages/PlaygroudPage';
import { TrainingsPage } from '../pages/trainings/TrainingsPage';
import { TrainingPage } from '../pages/traing/TrainingPage';
import { useMe } from '../hooks/UseMe';
import { LoadingOverlay } from '@mantine/core';
import { AuthorizationSuccessPage } from '../pages/AuthorizationSuccessPage';
import { AuthorizationFailedPage } from '../pages/AuthorizationFailedPage';

export const RequireAuth = () => {
    const { data, isLoading } = useMe();
    const location = useLocation();
    return (
        <div>
            <LoadingOverlay visible={isLoading} />
            {!isLoading && !data?.id && <Navigate to={Links.AUTHORIZATION_PAGE} state={{ from: location }} />}
            {!isLoading && <Outlet />}
        </div>
    );
};

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path={Links.AUTHORIZATION_PAGE} element={<AuthorizationPage />} />
            <Route path={Links.AUTHORIZATION_SUCCESS_PAGE} element={<AuthorizationSuccessPage />} />
            <Route path={Links.AUTHORIZATION_FAILURE_PAGE} element={<AuthorizationFailedPage />} />
            <Route element={<RequireAuth />}>
                <Route path={Links.ACCOUNT_PAGE} element={<AccountPage />} />
                <Route path={Links.TRAININGS} element={<TrainingsPage />} />
                <Route path={`${Links.TRAININGS}/:id`} element={<TrainingPage />} />
                <Route path={Links.PLAYGROUND} element={<PlaygroundPage />} />
                <Route path="*" element={<Navigate to={Links.TRAININGS} replace />} />
            </Route>
        </Routes>
    );
};
