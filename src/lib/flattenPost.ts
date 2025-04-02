import { PostDto, PostResponseDto } from '../mock/types/post.dto';

/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환
 */
const formatDate = (date: Date): string => {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * PostDto를 PostResponseDto로 변환하는 함수
 */
export const flattenPost = (post: PostDto): PostResponseDto => ({
  id: post.postId,
  title: post.title,
  filter: {
    startDate: formatDate(post.filter.startDate),
    endDate: formatDate(post.filter.endDate),
    deadlineDate: formatDate(post.filter.deadlineDate),
    deadlineTime: post.filter.deadlineTime,
    groupTheme: post.filter.groupTheme,
    groupSize: post.filter.groupSize,
    gender: post.filter.gender,
    age: post.filter.age,
  },
  location: {
    placeName: post.location.placeName,
    lat: post.location.lat,
    lng: post.location.lng,
  },
  content: post.content,
  thumbnailUrl: post.thumbnailUrl,
  tags: post.tags || [],
  // 추가 필드 (프론트엔드에서 필요한 정보)
  currentMembers: 1,
  maxMembers: Number(post.filter.groupSize.replace('인', '')) || 4,
  userId: post.user.kakaoId,
  userName: post.user.nickname,
  profileImage: post.user.profileImage,
  statusMessage: '여행 좋아해요~',
  userAge: post.user.age,
  userGender: post.user.gender,
});
