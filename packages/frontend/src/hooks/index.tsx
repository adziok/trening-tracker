import { useMutation, useQuery } from 'react-query';
import {
    IBaseServerError,
    ICreateTrainingDto,
    IPaginationDto,
    ITrainingDto,
    IUpdateTrainingDto,
    MutableActionResultDto,
} from '@trening-tracker/shared';
import { fetchBackendWithAuthorization } from '../utils/FetchBackendWithAuthorization';

export const createTrainingMutation = () =>
    useMutation<MutableActionResultDto, IBaseServerError, ICreateTrainingDto>((body) => {
        return fetchBackendWithAuthorization.post<MutableActionResultDto, ICreateTrainingDto>('training', { body });
    });

export const updateTrainingMutation = () =>
    useMutation<MutableActionResultDto, IBaseServerError, IUpdateTrainingDto>((body) => {
        return fetchBackendWithAuthorization.put<MutableActionResultDto, IUpdateTrainingDto>('training', { body });
    });

export const useTrainingList = (limit = 10, skip = 0) => {
    return useQuery<IPaginationDto<ITrainingDto>, { error: string }>('trainings', () =>
        fetchBackendWithAuthorization.get<IPaginationDto<ITrainingDto>>('training', { queryParams: { limit, skip } })
    );
};

export const useTraining = (trainingId: string) => {
    return useQuery<ITrainingDto, { error: string }>(['training', trainingId], () =>
        fetchBackendWithAuthorization.get<ITrainingDto>(`training/${trainingId}`)
    );
};
