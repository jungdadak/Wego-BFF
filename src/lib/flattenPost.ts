import { PostDto } from '../mock/types/post.dto';

export const flattenPost = (post: PostDto) => ({
  id: post.postId,
  title: post.title,
  content: post.content,
  imageSrc: post.thumbnailUrl,
  hashtags: post.tags,
  startDate: post.filter.startDate.toISOString().slice(0, 10),
  endDate: post.filter.endDate.toISOString().slice(0, 10),
  ageRange: post.filter.age.join(', '),
  gender: post.filter.gender,
  currentMembers: 1,
  maxMembers: Number(post.filter.groupSize.replace('인', '')) || 4,
  userId: post.user.kakaoId,
  userName: post.user.nickname,
  profileImage: post.user.profileImage,
  statusMessage: '여행 좋아해요~',
  age: `${post.user.age}대`,
  userGender: post.user.gender,
});
