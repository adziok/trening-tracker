import React from 'react';
import { useMe } from '../hooks/UseMe';

function AccountPage() {
    const { isLoading, error, data } = useMe();

    return (
        <div className="p-6 max-w-sm mx-auto bg-green-400 rounded-xl shadow-lg flex items-center space-x-4 text-center">
            <header>Hello on AccountPage</header>
            <div>
                {(isLoading && <div>LOADING ...</div>) ||
                    (data && <div>{JSON.stringify(data)}</div>) ||
                    (error && <div>{JSON.stringify(error)}</div>)}
            </div>
        </div>
    );
}

export { AccountPage };
