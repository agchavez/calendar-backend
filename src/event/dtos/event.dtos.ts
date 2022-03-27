import {
  IsEmpty,
  isEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class EventDtos {
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsNotEmpty()
  start: Date;

  @IsNumber()
  @IsNotEmpty()
  end: Date;

  @IsString()
  @IsNotEmpty()
  notes: string;
}

export class GetEventDtos {
  @IsString()
  @IsOptional()
  id?: string;

  @IsNumber()
  @IsNotEmpty()
  limit: number;

  @IsNumber()
  @IsNotEmpty()
  page: number;
}