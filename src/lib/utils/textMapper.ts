const categoryLabels: Record<string, string> = {
  PART: '친구 동행',
  FAMILY: '부부 동행',
  TOUR: '투어 동행',
  SHARE: '숙박 공유',
  SHOW: '전시/공연 동행',
  RESTAURANT: '맛집 동행',
};

const genderLabels: Record<string, string> = {
  MALE: '남성',
  FEMALE: '여성',
  ANY: '무관',
};

const ageLabels: Record<string, string> = {
  ALL: '무관',
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES: '50대',
  SIXTIES: '60대',
  SEVENTIES: '70대',
};

export function toKoreanLabel(
  value: string,
  type: 'category' | 'gender' | 'age',
): string {
  if (type === 'category') return categoryLabels[value] ?? value;
  if (type === 'gender') return genderLabels[value] ?? value;
  if (type === 'age') return ageLabels[value] ?? value;
  return value;
}
