import React, { useEffect, useState } from 'react';

const useMe = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<{ id: string } | null>(null);
    const [error, setError] = useState<{ error: string } | null>(null);

    useEffect(() => {
        fetch('/accounts/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
        })
            .then((res) => res.json())
            .then((res: { id: string }) => setData(res))
            .catch((e) => {
                console.log(e);
                setError({ error: ':(' });
            })
            .finally(() => setIsLoading(false));
    }, []);

    return { isLoading, data, error };
};

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
