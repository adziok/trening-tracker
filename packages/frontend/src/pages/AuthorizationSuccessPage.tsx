import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as querystring from 'query-string';

function AuthorizationSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = querystring.parse(location.search) as { accessToken: string; refreshToken: string };
        if (queryParams.accessToken && queryParams.refreshToken) {
            localStorage.setItem('accessToken', queryParams.accessToken);
            localStorage.setItem('refreshToken', queryParams.refreshToken);
            navigate('/');
        }
    }, [location?.search]);

    return <div>Authorization...</div>;
}

export { AuthorizationSuccessPage };
