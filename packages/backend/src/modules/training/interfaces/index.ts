export type ICreateTraining = { accountId: string; name: string; startedAt?: Date };
export type IUpdateTraining = ICreateTraining & { id: string };

export type ICreateExerciseInTraining = {
    accountId: string;
    name: string;
    trainingId: string;
    templateId: string;
};

export type IRemoveExerciseFromTraining = {
    accountId: string;
    exerciseId: string;
    trainingId: string;
};
