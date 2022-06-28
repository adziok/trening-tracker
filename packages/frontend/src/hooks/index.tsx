import { useMutation, useQuery } from 'react-query';
import {
    IAddSeriesToExerciseDto,
    IBaseServerError,
    ICreateExerciseInTrainingDto,
    ICreateTrainingDto,
    IExerciseDto,
    IPaginationDto,
    IRemoveExerciseFromTrainingDto,
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

export const useTrainingExercisesList = (trainingId: string, limit = 10, skip = 0) => {
    return useQuery<IPaginationDto<IExerciseDto>, { error: string }>(['trainingExercises', trainingId], () =>
        fetchBackendWithAuthorization.get<IPaginationDto<IExerciseDto>>('exercise', {
            queryParams: { limit, skip, trainingId },
        })
    );
};

export const createTrainingExerciseMutation = () =>
    useMutation<MutableActionResultDto, IBaseServerError, ICreateExerciseInTrainingDto>((body) => {
        return fetchBackendWithAuthorization.post<MutableActionResultDto, ICreateExerciseInTrainingDto>('exercise', {
            body,
        });
    });

export const removeTrainingExerciseMutation = () =>
    useMutation<MutableActionResultDto, IBaseServerError, IRemoveExerciseFromTrainingDto>((body) => {
        return fetchBackendWithAuthorization.delete<MutableActionResultDto>(
            `exercise/${body.trainingId}/${body.exerciseId}`
        );
    });

export const createTrainingExerciseSeriesMutation = () =>
    useMutation<MutableActionResultDto, IBaseServerError, IAddSeriesToExerciseDto>((body) => {
        return fetchBackendWithAuthorization.post<MutableActionResultDto, IAddSeriesToExerciseDto>(
            `exercise/${body.trainingId}/${body.exerciseId}`,
            {
                body,
            }
        );
    });
