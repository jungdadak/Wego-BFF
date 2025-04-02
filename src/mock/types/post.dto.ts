import { ApiProperty } from '@nestjs/swagger';

// 응답용 필터 DTO (문자열로 날짜 반환)
export class FilterResponseDto {
  @ApiProperty({ example: '2025-04-10', description: '여행 시작일' })
  startDate: string;

  @ApiProperty({ example: '2025-04-15', description: '여행 종료일' })
  endDate: string;

  @ApiProperty({ example: '2025-04-01', description: '모집 마감일' })
  deadlineDate: string;

  @ApiProperty({ example: '18:00', description: '모집 마감 시간' })
  deadlineTime: string;

  @ApiProperty({ example: '여행 동행', description: '모임 테마' })
  groupTheme: string;

  @ApiProperty({ example: '4인', description: '모임 인원' })
  groupSize: string;

  @ApiProperty({ example: '여', description: '성별 제한', nullable: true })
  gender: string | null;

  @ApiProperty({ example: ['20대'], description: '나이대 제한' })
  age: string[];
}

// 입력용 필터 DTO (Date 객체로 날짜 처리)
export class FilterDto {
  @ApiProperty({ example: '2025-04-10', description: '여행 시작일' })
  startDate: Date;

  @ApiProperty({ example: '2025-04-15', description: '여행 종료일' })
  endDate: Date;

  @ApiProperty({ example: '2025-04-01', description: '모집 마감일' })
  deadlineDate: Date;

  @ApiProperty({ example: '18:00', description: '모집 마감 시간' })
  deadlineTime: string;

  @ApiProperty({ example: '여행 동행', description: '모임 테마' })
  groupTheme: string;

  @ApiProperty({ example: '4인', description: '모임 인원' })
  groupSize: string;

  @ApiProperty({ example: '여', description: '성별 제한', nullable: true })
  gender: string | null;

  @ApiProperty({ example: ['20대'], description: '나이대 제한' })
  age: string[];
}

export class LocationDto {
  @ApiProperty({ example: '서울 강남구', description: '장소명' })
  placeName: string;

  @ApiProperty({ example: 37.5172, description: '위도' })
  lat: number;

  @ApiProperty({ example: 127.0473, description: '경도' })
  lng: number;
}

export class UserDto {
  @ApiProperty({ example: '12345', description: '카카오 ID' })
  kakaoId: string;

  @ApiProperty({ example: '여행자', description: '닉네임' })
  nickname: string;

  @ApiProperty({ example: 25, description: '나이' })
  age: number;

  @ApiProperty({ example: '여자', description: '성별' })
  gender: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: '프로필 이미지 URL',
  })
  profileImage: string;
}

export class PostDto {
  @ApiProperty({ example: 1, description: '게시글 ID' })
  postId: number;

  @ApiProperty({
    example: '제주도 같이 가실 분~',
    description: '게시글 제목',
    maxLength: 32,
  })
  title: string;

  @ApiProperty({ type: FilterDto, description: '필터 정보' })
  filter: FilterDto;

  @ApiProperty({ type: LocationDto, description: '위치 정보' })
  location: LocationDto;

  @ApiProperty({ description: '게시글 내용', minLength: 115, maxLength: 20000 })
  content: string;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: '썸네일 URL',
  })
  thumbnailUrl: string;

  @ApiProperty({
    example: ['#여행', '#맛집'],
    description: '태그 목록',
    maxItems: 5,
  })
  tags: string[];

  @ApiProperty({ type: UserDto, description: '작성자 정보' })
  user: UserDto;
}

// 응답용 DTO
export class PostResponseDto {
  @ApiProperty({ example: 1, description: '게시글 ID' })
  id: number;

  @ApiProperty({ example: '제주도 같이 가실 분~', description: '게시글 제목' })
  title: string;

  @ApiProperty({ type: () => FilterResponseDto, description: '필터 정보' })
  filter: FilterResponseDto;

  @ApiProperty({ type: () => LocationDto, description: '위치 정보' })
  location: LocationDto;

  @ApiProperty({ description: '게시글 내용' })
  content: string;

  @ApiProperty({
    example: 'https://example.com/thumbnail.jpg',
    description: '썸네일 URL',
  })
  thumbnailUrl: string;

  @ApiProperty({ example: ['#여행', '#맛집'], description: '태그 목록' })
  tags: string[];

  @ApiProperty({ example: 1, description: '현재 참여 인원' })
  currentMembers: number;

  @ApiProperty({ example: 4, description: '최대 참여 인원' })
  maxMembers: number;

  @ApiProperty({ example: '12345', description: '사용자 ID' })
  userId: string;

  @ApiProperty({ example: '여행자', description: '사용자 이름' })
  userName: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: '프로필 이미지',
  })
  profileImage: string;

  @ApiProperty({ example: '여행 좋아해요~', description: '상태 메시지' })
  statusMessage: string;

  @ApiProperty({ example: '20대', description: '사용자 나이' })
  userAge: number;

  @ApiProperty({ example: '여자', description: '사용자 성별' })
  userGender: string;
}
