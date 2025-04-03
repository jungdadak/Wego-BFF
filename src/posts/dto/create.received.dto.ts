import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  AgeGroup,
  Gender,
  GroupSize,
  GroupTheme,
} from '../../enums/filter.enum';

class LocationDto {
  @IsString()
  placeName: string;

  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

class FilterDto {
  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsDateString()
  deadlineDate: string;

  @IsString()
  deadlineTime: string;

  @IsEnum(GroupTheme)
  groupTheme: GroupTheme;

  @IsEnum(GroupSize)
  groupSize: GroupSize;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsArray()
  @IsEnum(AgeGroup, { each: true })
  age: AgeGroup[];
}

export class CreateReceivedDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ValidateNested()
  @Type(() => FilterDto)
  filter: FilterDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
