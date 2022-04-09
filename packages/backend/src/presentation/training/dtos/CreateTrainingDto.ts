import { IsDate, IsOptional, IsString, Length } from 'class-validator';

export class CreateTrainingDto {
    @IsString()
    @Length(3, 100)
    name: string;

    @IsOptional()
    @IsDate()
    startedAt?: Date;
}
