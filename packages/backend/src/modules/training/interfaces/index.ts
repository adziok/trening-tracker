export type ICreateTraining = { accountId: string; name: string; startedAt?: Date };
export type IUpdateTraining = ICreateTraining & { id: string };
