export interface PostDto {
  postId: number;
  title: string;
  filter: {
    startDate: Date;
    endDate: Date;
    deadlineDate: Date;
    deadlineTime: string;
    groupTheme: string;
    groupSize: string;
    gender: string | null;
    age: string[];
  };
  location: {
    placeName: string;
    lat: number;
    lng: number;
  };
  content: string;
  thumbnailUrl?: string;
  tags?: string[];
  user: {
    kakaoId: string;
    nickname: string;
    age: number;
    gender: '남자' | '여자';
    profileImage: string;
  };
}
