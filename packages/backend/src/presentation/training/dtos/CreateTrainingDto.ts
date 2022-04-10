import { IsDate, IsOptional, IsString, Length } from 'class-validator';
import { ICreateTrainingDto } from '@trening-tracker/shared';

export class CreateTrainingDto implements ICreateTrainingDto {
    @IsString()
    @Length(3, 100)
    name: string;

    @IsOptional()
    @IsDate()
    startedAt?: Date;
}
