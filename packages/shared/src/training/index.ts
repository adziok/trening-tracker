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
    startedAt?: Date;
};
