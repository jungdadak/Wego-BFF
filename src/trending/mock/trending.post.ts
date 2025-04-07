const BASE_URL = 'https://gateway.wego-travel.click/';

export const mockTrendingPosts = [
  {
    id: 1,
    title: '제주도 동행 구합니다',
    filter: {
      startDate: '2025-04-10T00:00:00.000Z',
      endDate: '2025-04-12T00:00:00.000Z',
      deadlineDate: '2025-04-09T00:00:00.000Z',
      groupTheme: '여행 동행',
      groupSize: '4인',
      gender: '여자',
      age: ['20대'],
    },
    location: {
      placeName: '제주도 제주시',
      lat: 33.4996,
      lng: 126.5312,
    },
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"3월 10일부터 12일까지 제주도 여행 갈 예정입니다! 렌트카로 제주도 일주하면서 맛집 탐방하고 올레길도 걸어보고 싶어요. 숙소는 서귀포시 근처 게스트하우스 생각 중이에요. 같이 즐거운 추억 만드실 20대 여성분 구합니다! 편하게 연락주세요 😊"}]}]}',

    thumbnailUrl: `${BASE_URL}static/image/jejuGirl.png`,
    tags: ['#여행', '#제주도'],
    currentMembers: 1,
    maxMembers: 4,
    userId: 'dongki',
    userName: '김동키',
    profileImage: `${BASE_URL}static/image/userIcon.png`,
    statusMessage: '여행 좋아해요~',
    userAge: 25,
    userGender: '여자',
    userRating: 4.5,
  },
  {
    id: 2,
    title: '서울 맛집 탐방',
    filter: {
      startDate: '2025-03-22T00:00:00.000Z',
      endDate: '2025-03-26T00:00:00.000Z',
      deadlineDate: '2025-03-15T00:00:00.000Z',
      groupTheme: '여행 동행',
      groupSize: '4인',
      gender: '남자',
      age: ['40대'],
    },
    location: {
      placeName: '서울 강남구',
      lat: 37.5172,
      lng: 127.0473,
    },
    content:
      '{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","marks":[{"type":"highlight","attrs":{"color":"#A0F0ED"}}],"text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. "},{"type":"text","text":"Quis "},{"type":"text","marks":[{"type":"highlight","attrs":{"color":"#eac234"}}],"text":"hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec"},{"type":"text","text":" adipiscing "},{"type":"text","marks":[{"type":"highlight","attrs":{"color":"#6b0df8"}}],"text":"tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. "},{"type":"text","text":"Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac."}]},{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Senectus et netus et malesuada."}]},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":" Nunc pulvinar sapien et ligula ullamcorper malesuada proin."}]},{"type":"paragraph","attrs":{"textAlign":"center"},"content":[{"type":"text","marks":[{"type":"italic"}],"text":" Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget."},{"type":"text","text":" "}]},{"type":"paragraph","attrs":{"textAlign":"right"},"content":[{"type":"text","marks":[{"type":"bold"}],"text":"Leo a diam sollicitudin tempor id. "}]},{"type":"heading","attrs":{"textAlign":"center","level":2},"content":[{"type":"text","marks":[{"type":"bold"},{"type":"italic"}],"text":"A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque."}]},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":" Feugiat in fermentum posuere urna nec tincidunt praesent."}]},{"type":"paragraph","attrs":{"textAlign":null}},{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":" Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim."}]},{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Sit amet nulla facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit."}]}]}',

    thumbnailUrl:
      'https://wegotiptaparticleimageuploadersuperultraggorgeousbucket.s3.ap-northeast-2.amazonaws.com/mock/godok.jpeg',
    tags: ['#서울', '#맛집'],
    currentMembers: 1,
    maxMembers: 4,
    userId: 'baek',
    userName: '백종원',
    profileImage: `${BASE_URL}static/image/userIcon.png`,
    statusMessage: '맛집 탐방 좋아요!',
    userAge: 45,
    userGender: '남자',
    userRating: 4.5,
  },
  {
    id: 3,
    title: '강릉 카페 투어 동행',
    filter: {
      startDate: '2025-03-20T00:00:00.000Z',
      endDate: '2025-03-22T00:00:00.000Z',
      deadlineDate: '2025-03-10T00:00:00.000Z',
      groupTheme: '여행 동행',
      groupSize: '4인',
      gender: '여자',
      age: ['20대'],
    },
    location: {
      placeName: '강원도 강릉시',
      lat: 37.7519,
      lng: 128.8761,
    },
    content:
      '{"type":"doc","content":[{"type":"heading","attrs":{"textAlign":null,"level":1},"content":[{"type":"text","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac."}]},{"type":"image","attrs":{"src":"data:image/jpeg;base64,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","alt":"이주빈 \\"10년을 배우 지망생으로 살았는데…큰 사랑에 얼떨떨\\" | 연합뉴스","title":null}},{"type":"heading","attrs":{"textAlign":null,"level":2},"content":[{"type":"text","text":"Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent"}]},{"type":"heading","attrs":{"textAlign":null,"level":3},"content":[{"type":"hardBreak"},{"type":"text","text":"elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim."}]},{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","text":"Sit amet nulla facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit."},{"type":"hardBreak"},{"type":"hardBreak"},{"type":"text","marks":[{"type":"link","attrs":{"href":"https://github.com/jungdadak","target":"_blank","rel":"noopener noreferrer nofollow","class":null}}],"text":"https://github.com/jungdadak"}]}]}',

    thumbnailUrl: `${BASE_URL}static/image/TemporalBG.png`,
    tags: ['#강릉', '#카페투어'],
    currentMembers: 1,
    maxMembers: 4,
    userId: 'choi',
    userName: '최카페',
    profileImage: `${BASE_URL}static/image/userIcon.png`,
    statusMessage: '카페 덕후입니다 ☕️',
    userAge: 25,
    userGender: '여자',
    userRating: 4.5,
  },
  {
    id: 4,
    title: '부산 여행 같이 가실 분',
    filter: {
      startDate: '2025-03-15T00:00:00.000Z',
      endDate: '2025-03-17T00:00:00.000Z',
      deadlineDate: '2025-03-05T00:00:00.000Z',
      groupTheme: '여행 동행',
      groupSize: '4인',
      gender: '남자',
      age: ['30대'],
    },
    location: {
      placeName: '부산 해운대구',
      lat: 35.1631,
      lng: 129.1635,
    },
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"3월 15일부터 17일까지 부산 여행 동행 구합니다! 해운대, 광안리, 감천문화마을, 자갈치시장 등 부산 핫플레이스 돌아다닐 예정이에요. 부산 여행이 처음이라 같이 가면 더 재미있을 것 같아요. 숙소는 해운대 근처로 잡았습니다. 즐거운 부산 여행 같이해요 🌊"}]}]}',

    thumbnailUrl: `${BASE_URL}static/image/jejuGirl.png`,
    tags: ['#부산', '#여행'],
    currentMembers: 1,
    maxMembers: 4,
    userId: 'hangout',
    userName: '역마살',
    profileImage: `${BASE_URL}static/image/userIcon.png`,
    statusMessage: '역마살 낀 사람입니다~',
    userAge: 35,
    userGender: '남자',
    userRating: 4.5,
  },
  {
    id: 5,
    title: 'props 여행',
    filter: {
      startDate: '2025-04-01T00:00:00.000Z',
      endDate: '2025-04-03T00:00:00.000Z',
      deadlineDate: '2025-03-20T00:00:00.000Z',
      groupTheme: '여행 동행',
      groupSize: '4인',
      gender: '여자',
      age: ['30대'],
    },
    location: {
      placeName: '경기도 수원시',
      lat: 37.2636,
      lng: 127.0286,
    },
    content:
      '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"4월 1일부터 3일까지 속초 여행 가실 분 구해요! 속초 중앙시장에서 맛있는 것도 먹고, 설악산도 등산하고, 해수욕장도 구경할 계획입니다. 중간중간 예쁜 카페도 들르고 싶어요. 활동적인 여행 좋아하시는 분이면 더 좋을 것 같아요. 숙소는 속초 해수욕장 근처입니다 🏔"}]}]}',

    thumbnailUrl: `${BASE_URL}static/image/jejuGirl.png`,
    tags: ['#소품여행', '#여행'],
    currentMembers: 1,
    maxMembers: 4,
    userId: 'drill',
    userName: '김드릴',
    profileImage: `${BASE_URL}static/image/userIcon.png`,
    statusMessage: '소품 좋아해요!',
    userAge: 35,
    userGender: '여자',
    userRating: 4.5,
  },
] as const;
