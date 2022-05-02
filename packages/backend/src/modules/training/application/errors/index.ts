import { BaseError } from '../../../../shared/classes/Result';

export class TrainingNotRelatedToAccountException extends BaseError {
    constructor() {
        super('Training with given id not exists or is not related  to your account');
    }
}
