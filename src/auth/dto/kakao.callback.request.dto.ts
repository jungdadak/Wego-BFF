import { IsString } from 'class-validator';

/**
 * 카카오 리디렉션 응답 객체
 */
export class KakaoCallbackRequestDto {
  @IsString()
  code: string;

  @IsString()
  state: string;
}
