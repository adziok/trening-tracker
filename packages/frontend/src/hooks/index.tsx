import { useMutation } from 'react-query';
import { fetchBackendWithAuthorization } from '../utils/FetchBackendWithAuthorization';
import { IBaseServerError, ICreateTrainingDto, MutableActionResultDto } from '@trening-tracker/shared';

export const createTrainingMutation = () =>
    useMutation<MutableActionResultDto, IBaseServerError, ICreateTrainingDto>(() => {
        return fetchBackendWithAuthorization.post<MutableActionResultDto, ICreateTrainingDto>('training');
    });
