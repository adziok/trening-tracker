import { useQuery } from 'react-query';
import { fetchBackendWithAuthorization } from '../utils/FetchBackendWithAuthorization';

export const useMe = () => {
    return useQuery<{ id: string }, { error: string }>(
        'me',
        () => fetchBackendWithAuthorization.get<{ id: string }>('accounts/me'),
        { cacheTime: 5 * 60000 }
    );
};
