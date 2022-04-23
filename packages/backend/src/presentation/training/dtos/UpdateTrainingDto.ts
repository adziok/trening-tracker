import { IsUUID } from 'class-validator';
import { IUpdateTrainingDto } from '@trening-tracker/shared';
import { CreateTrainingDto } from './CreateTrainingDto';

export class UpdateTrainingDto extends CreateTrainingDto implements IUpdateTrainingDto {
    @IsUUID()
    id: string;
}
