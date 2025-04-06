import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  AgeGroup,
  Gender,
  GroupSize,
  GroupTheme,
} from '../../enums/filter.enum';

export class FilterDto {
  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string | null;

  @IsOptional()
  @IsDateString()
  endDate?: string | null;

  @IsOptional()
  @IsEnum(GroupTheme)
  groupTheme?: GroupTheme; // 여기서는 GroupTheme enum 값을 사용합니다

  @IsOptional()
  @IsEnum(GroupSize)
  groupSize?: GroupSize; // 여기서는 GroupSize enum 값을 사용합니다

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender; // 여기서는 Gender enum 값을 사용합니다

  @IsOptional()
  @IsEnum(AgeGroup)
  age?: AgeGroup; // 여기서는 AgeGroup enum 값을 사용합니다

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isGroupOpen?: boolean;
}
