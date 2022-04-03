import {
  IsDate,
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

  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  end: Date;

  @IsString()
  @IsNotEmpty()
  notes: string;
}

export class UpdateEventDtos {
  @IsString()
  @IsOptional()
  title: string;

  @IsDate()
  @IsOptional()
  start: Date;

  @IsDate()
  @IsOptional()
  end: Date;

  @IsString()
  @IsOptional()
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
