import { IPaginationQueryDto } from '../shared';

export type ICreateTrainingDto = {
    name: string;
    startedAt?: Date;
};

export type IUpdateTrainingDto = {
    id: string;
    name: string;
    startedAt?: Date;
};

export type ITrainingDto = {
    id: string;
    name: string;
    startedAt: Date;
};

export type ISeriesDto = {
    id: string;
    reps: number;
    weight: number;
};

export type IExerciseDto = {
    id: string;
    name: string;
    trainingId: string;
    series: ISeriesDto[];
};

export type ICreateExerciseInTrainingDto = {
    name: string;
    trainingId: string;
    templateId: string;
};

export type IAddSeriesToExerciseDto = {
    reps: number;
    weight: number;
};

export type IRemoveExerciseFromTrainingDto = {
    exerciseId: string;
    trainingId: string;
};

export type IPaginationExercisesQueryDto = IPaginationQueryDto & { trainingId: string };
