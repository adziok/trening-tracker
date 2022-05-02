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

export type IExerciseDto = {
    id: string;
    name: string;
    trainingId: string;
};

export type IAddExerciseToTrainingDto = {
    name: string;
    trainingId: string;
};
