import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <MantineProvider
            theme={{
                // Override any other properties from default theme
                fontFamily:
                    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
                spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
            }}
        >
            <NotificationsProvider>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </QueryClientProvider>
            </NotificationsProvider>
        </MantineProvider>
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
