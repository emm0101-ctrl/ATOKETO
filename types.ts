export interface MenuItem {
  id: string;
  name: string;
  engName: string;
  description: string;
  image: string;
  price: string;
}

export interface OrderStep {
  step: string;
  title: string;
  desc: string;
  image: string;
}

export interface StoreLocation {
  name: string;
  address: string;
  lat: number; // Required for map visualization
  lng: number; // Required for map visualization
}

export interface FeatureItem {
  title: string;
  desc: string;
  image: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  content: string;
  image: string;
  tag: string;
}

export interface StartupCostItem {
  category: string;
  price: string;
  originalPrice?: string; // For strikethrough effect
  highlight?: boolean;
  image?: string; // Added for illustrations
}

export interface InteriorItem {
  name: string;
  image: string;
}

export interface BenefitItem {
  title: string;
  desc: string;
  image?: string; // Added optional image for benefits
}

export type SectionKey = 'hero' | 'reviews' | 'benefits' | 'interior' | 'startupCost' | 'menu' | 'locations' | 'franchise';

export interface SiteContent {
  sectionOrder: SectionKey[]; // NEW: Controls the render order
  header: {
    logo: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    images: string[];
  };
  reviews: {
    title: string;
    subtitle: string;
    items: ReviewItem[];
  };
  brandStory: {
    tagline: string;
    title: string;
    description: string;
    image: string;
  };
  howToOrder: {
    title: string;
    subtitle: string;
    steps: OrderStep[];
  };
  menu: {
    title: string;
    subtitle: string;
    items: MenuItem[];
  };
  competitiveness: {
    title: string;
    subtitle: string;
    features: FeatureItem[];
  };
  benefits: {
    title: string;
    items: BenefitItem[];
  };
  interior: {
    title: string;
    subtitle: string;
    items: InteriorItem[];
  };
  startupCost: {
    title: string;
    subtitle: string;
    items: StartupCostItem[];
  };
  about: {
    title: string;
    description: string;
    features: { title: string; desc: string; icon: string; image: string }[];
    image: string;
  };
  story: {
    title: string;
    videoPlaceholder: string;
    description: string;
  };
  franchise: {
    title: string;
    subtitle: string;
    contactPhone: string;
    stats: { title: string; subtitle: string; highlight: string }[];
  };
  locations: {
    title: string;
    mapImage: string; // NEW: Customizable map background
    list: StoreLocation[];
  };
  footer: {
    copyright: string;
    address: string;
  };
}

export const INITIAL_CONTENT: SiteContent = {
  sectionOrder: ['hero', 'reviews', 'benefits', 'interior', 'startupCost', 'menu', 'locations', 'franchise'],
  header: {
    // Using new green color in SVG logo
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 120' fill='none'%3E%3Ctext x='200' y='35' text-anchor='middle' font-family='sans-serif' font-weight='700' fill='%23008037' letter-spacing='4px' font-size='14px'%3EPREMIUM FRESH POKE%3C/text%3E%3Ctext x='200' y='105' text-anchor='middle' font-family='sans-serif' font-weight='900' font-size='72' letter-spacing='-3' fill='%23008037'%3EATOKETO%3C/text%3E%3C/svg%3E" 
  },
  hero: {
    title: "Freshness\nYou Can Taste",
    subtitle: "매일 아침 배송되는 신선한 재료와\n아토키토만의 특제 소스로 완성된 완벽한 한 끼.\n건강한 라이프스타일을 시작하세요.",
    ctaText: "가맹 상담 신청하기",
    images: [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2000&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  reviews: {
    title: "고객님의 솔직 리뷰",
    subtitle: "수익률만 좋냐고요? 맛도 좋습니다!",
    items: [
      {
        id: 'r1',
        author: '꼬깔룸',
        rating: 5,
        content: "흑흑 2주동안 먹고싶을때마다 배민닫혀잇길래 다른데도먹어봣지만 실망하고 역시 여기가짱이에요ㅠㅠ 사장님 맛있게만들어주셔서감사합니다!!! 재료도신선하고 맛은 말할것도없고 양도좋고 정말맛있어서 일주일에1번은무조건먹어야하는메뉴가된거같아요",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80",
        tag: "수비드 목살 샐러드"
      },
      {
        id: 'r2',
        author: '배민수수료나빠',
        rating: 5,
        content: "저희 항상 이곳에서 포케를 주문합니다. 아들딸 두아이 모두 좋아해요. 한번은 다른데서 시켰다가 애들이 어찌나 뭐라하던지..ㅋ 맛있게 잘 먹겠습니다!",
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=200&q=80",
        tag: "연어 포케 현미밥"
      },
      {
        id: 'r3',
        author: '맛집리뷰인',
        rating: 5,
        content: "하 진짜 포케계의 빅뱅같은... 너무 맛있어서 맨날 여기서만 시켜먹어요. 포케는 말할것도 없고 그릭요거트...진짜 코코넛이랑 꾸덕 촉촉한 그릭이 생각나서 맨날 먹고싶을 정도에요. 요 저 거의 맨날 시켜먹을게요 사랑합니다 오래오래 영업해주세요..❤️",
        image: "https://images.unsplash.com/photo-1621532296705-4b93fb5f524e?w=200&q=80",
        tag: "허니 그레이프 그릭요거트"
      },
      {
        id: 'r4',
        author: '코코',
        rating: 5,
        content: "오랜만에 포케랑 샌드위치가 땡겨서 시켜먹었는데.. 역시 아토키토 갈릭바질소스가 최고네요 진짜 너무너무 맛있게 먹어서 하루종일 든든했어요..!! 샌드위치도 야채 통통하게 채워주시고 고기도 많고 블루베리잼?이랑도 궁합이 진짜 좋았어요 진짜진짜 맛있었어용 👍👍",
        image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=200&q=80",
        tag: "수비드 목살 샌드위치"
      }
    ]
  },
  brandStory: {
    tagline: "Pure & Natural",
    title: "Healthy Food\nDoes Not Have To Be Boring.",
    description: "아토키토는 '선물'을 뜻하는 순우리말 '아토(ATO)'와 '키토제닉(KETO)'의 만남입니다.\n\n우리는 맛을 포기하지 않는 건강함을 추구합니다. 자연에서 온 색감, 신선한 텍스처, 그리고 영양학적 밸런스.\n\n내 몸이 가장 좋아하는 선물, 아토키토와 함께 시작하세요.",
    image: "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?w=1000&q=80"
  },
  howToOrder: {
    title: "Order Guide",
    subtitle: "나만의 포케를 만드는 즐거운 과정",
    steps: [
      { step: "01", title: "Base", desc: "현미곤약밥 / 메밀면 / 채소", image: "https://images.unsplash.com/photo-1640719028782-4f5298f2b162?w=500&q=80" },
      { step: "02", title: "Protein", desc: "연어 / 튜나 / 새우 / 치킨", image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=500&q=80" },
      { step: "03", title: "Source", desc: "스파이시 / 유자 / 참깨", image: "https://images.unsplash.com/photo-1621532296705-4b93fb5f524e?w=500&q=80" },
      { step: "04", title: "Toppings", desc: "아보카도 / 썬드라이토마토", image: "https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=500&q=80" }
    ]
  },
  menu: {
    title: "시그니처 메뉴",
    subtitle: "Taste the freshness of nature",
    items: [
      { 
        id: '1', 
        name: "슈퍼 세븐 볼", 
        engName: "Super Seven Bowl",
        description: "케일, 블루베리, 김치, 그래놀라가 어우러진 완벽한 영양 밸런스.", 
        price: "9,000", 
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80" 
      },
      { 
        id: '2', 
        name: "튜나 찹 라멘", 
        engName: "Tuna Chop Ramen",
        description: "신선한 참치와 메밀면, 오렌지 진저 드레싱의 상큼한 조화.", 
        price: "8,500", 
        image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80" 
      },
      { 
        id: '3', 
        name: "아보카도 반미", 
        engName: "Avocado Banh Mi",
        description: "부드러운 아보카도와 바삭한 바게트의 건강한 샌드위치.", 
        price: "9,500", 
        image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=500&q=80" 
      },
      { 
        id: '4', 
        name: "프로틴 머슬 팩", 
        engName: "Protein Muscle Pack",
        description: "닭가슴살 200g과 구운 야채로 꽉 채운 고단백 식단.", 
        price: "11,000", 
        image: "https://images.unsplash.com/photo-1511690656952-34342d5c71df?w=500&q=80" 
      },
      { 
        id: '5', 
        name: "바질 오일 파스타", 
        engName: "Basil Oil Pasta",
        description: "향긋한 바질 페스토와 엑스트라 버진 올리브 오일의 풍미.", 
        price: "12,000", 
        image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=500&q=80" 
      },
      { 
        id: '6', 
        name: "스파이시 로제 파스타", 
        engName: "Spicy Rose Pasta",
        description: "부드러운 크림소스에 매콤함을 더한 중독성 있는 맛.", 
        price: "13,000", 
        image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?w=500&q=80" 
      },
    ]
  },
  competitiveness: {
    title: "Why Atoketo?",
    subtitle: "아토키토가 특별한 이유",
    features: [
      {
        title: "Farm to Table",
        desc: "매일 아침 배송되는 신선한 채소와 프리미엄 식재료만을 고집합니다.",
        image: "https://images.unsplash.com/photo-1595855709940-5100a9436326?w=800&q=80"
      },
      {
        title: "Easy Cooking",
        desc: "전문 셰프 없이도 누구나 손쉽게 조리 가능한 간편 시스템.",
        image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=800&q=80"
      },
      {
        title: "High Profit",
        desc: "효율적인 동선과 운영 시스템으로 업계 최고 수준의 수익률 실현.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560eb3e?w=800&q=80"
      },
      {
        title: "Stable Logistics",
        desc: "대기업 물류 시스템을 통해 전국 어디든 신선함을 그대로 배송합니다.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80"
      }
    ]
  },
  benefits: {
    title: "점주님과 함께 성장하기 위한 9가지 특급 혜택!",
    items: [
      { title: "가맹비 전액 지원", desc: "1,000만원 → 0원" },
      { title: "로열티 6개월 면제", desc: "10호점까지 오픈 후 6개월 면제" },
      { title: "이행보증금 면제", desc: "초기 부담금 ZERO" },
      { title: "마케팅 50% 지원", desc: "온라인 홍보 마케팅 50% 지원" },
      { title: "배달 플랫폼 공략 교육", desc: "배달의민족, 쿠팡이츠 등 실전 노하우" },
      { title: "1:1 전담 케어", desc: "오픈 후 1:1 전담 케어 서비스" },
      { title: "물품 50% 지원", desc: "초도 물품 50% 지원" },
      { title: "오픈 지원", desc: "2주 교육 or 오픈 지원 2주" },
      { title: "인테리어 자체 시공 가능", desc: "강제성 없는 합리적 창업" },
    ]
  },
  interior: {
    title: "아토키토만의\n깔끔한 인테리어!",
    subtitle: "Interior",
    items: [
      { name: "마포점", image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" },
      { name: "마곡점", image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80" },
      { name: "역삼점", image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=80" },
      { name: "은계점", image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=800&q=80" }
    ]
  },
  startupCost: {
    title: "아토키토 창업비용",
    subtitle: "13평 기준 / VAT 별도",
    items: [
      { category: "가맹비", price: "0원", originalPrice: "1,000만원", highlight: true, image: "https://img.icons8.com/fluency/96/shop.png" },
      { category: "교육비", price: "500만원", image: "https://img.icons8.com/fluency/96/classroom.png" },
      { category: "계약이행보증금", price: "0원", image: "https://img.icons8.com/fluency/96/contract.png" },
      { category: "로열티", price: "6개월 면제", originalPrice: "10호점까지", highlight: true, image: "https://img.icons8.com/fluency/96/crown.png" },
      { category: "인테리어", price: "평당 180만원", highlight: false, image: "https://img.icons8.com/fluency/96/interior.png" },
      { category: "주방기기 / 기물", price: "1,600만원", originalPrice: "2,132만원", highlight: true, image: "https://img.icons8.com/fluency/96/kitchenware.png" },
      { category: "아웃테리어 / 간판", price: "600만원", originalPrice: "803만원", highlight: true, image: "https://img.icons8.com/fluency/96/billboard.png" },
      { category: "홍보물 / 의탁자", price: "600만원", originalPrice: "813만원", highlight: true, image: "https://img.icons8.com/fluency/96/table.png" },
    ]
  },
  about: {
    title: "About ATOKETO",
    description: "아토키토는 신선함, 건강, 맛, 고객 중심성을 중시하며\n특별한 식사 경험과 건강한 라이프 스타일을 제공하기 위해 노력합니다.",
    features: [
      { 
        title: "Fresh Ingredients", 
        desc: "신선함은 우리의 가장 큰 자부심입니다.", 
        icon: "leaf",
        image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop" 
      },
      { 
        title: "Customer-Centric", 
        desc: "고객의 취향을 존중하는 커스텀 레시피.", 
        icon: "heart",
        image: "https://images.unsplash.com/photo-1542546068979-b6affb46ea8f?q=80&w=1974&auto=format&fit=crop" 
      },
      { 
        title: "Healthy Lifestyle", 
        desc: "지속가능한 삶과 환경을 생각합니다.", 
        icon: "droplet",
        image: "https://images.unsplash.com/photo-1544367563-12123d8966cd?q=80&w=2070&auto=format&fit=crop" 
      },
      { 
        title: "Shareable", 
        desc: "오감을 만족시키는 플레이팅 경험.", 
        icon: "star",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop" 
      },
    ],
    image: "https://images.unsplash.com/photo-1633478062482-790e3b5dd810?w=800&q=80"
  },
  story: {
    title: "Real Success Story",
    videoPlaceholder: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000&q=80",
    description: "\"저당 소스와 키토제닉이라는 확실한 차별점이 경쟁력이었습니다. 오픈 첫 달부터 다이어터 분들의 입소문을 타고 단골이 늘어났어요. 본사의 메뉴 개발력과 마케팅 지원이 큰 힘이 되었습니다.\"\n\n- 마포점 이OO 점주님"
  },
  franchise: {
    title: "Start Your Journey",
    subtitle: "아토키토와 함께 건강한 성공을 만드세요.\n전문 컨설턴트가 상권 분석부터 오픈까지 함께합니다.",
    contactPhone: "1533-3711",
    stats: [
      { highlight: "0%", title: "가맹점 폐업율", subtitle: "2021~2025.01 기준" },
      { highlight: "4,200만원", title: "전지점 평균매출", subtitle: "마이프차 인증완료" },
      { highlight: "주6일 배송", title: "아워홈 물류계약", subtitle: "안정적 식자재 공급" },
      { highlight: "1위", title: "동종업계 맛집랭킹", subtitle: "전지점 상위권 달성" }
    ]
  },
  locations: {
    title: "Store Locations",
    mapImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/South_Korea_location_map.svg/1066px-South_Korea_location_map.svg.png",
    list: [
      { name: "분당 야탑직영점", address: "경기 성남시 분당구 성남대로925번길 37", lat: 37.411, lng: 127.128 },
      { name: "서울 보라매점", address: "서울 관악구 봉천로7길 41", lat: 37.491, lng: 126.924 },
      { name: "서울 성수점", address: "서울 성동구 광나루로6길 35", lat: 37.548, lng: 127.056 },
      { name: "하남 위례점", address: "경기 하남시 위례중앙로 185", lat: 37.471, lng: 127.143 },
      { name: "경기 광주점", address: "경기 광주시 태전중앙1길 5", lat: 37.399, lng: 127.221 },
      { name: "서울 가좌점", address: "서울 서대문구 수색로6길 17-14", lat: 37.568, lng: 126.913 },
      { name: "고양 식사점", address: "경기 고양시 일산동구 위시티로 81", lat: 37.674, lng: 126.809 },
      { name: "고양 삼송직영점", address: "경기 고양시 덕양구 삼송로 222", lat: 37.649, lng: 126.897 },
      { name: "일산 주엽점", address: "고양시 일산서구 중앙로 1470", lat: 37.670, lng: 126.761 },
      { name: "가든파이브점", address: "서울시 송파구 충민로 52", lat: 37.478, lng: 127.125 },
      { name: "송파 문정점", address: "서울특별시 송파구 문정동 644-2", lat: 37.485, lng: 127.122 },
      { name: "경희대 국제캠퍼스점", address: "경기도 수원시 영통구 영일로 16-4", lat: 37.239, lng: 127.081 }
    ]
  },
  footer: {
    copyright: "© 2024 ATOKETO. All rights reserved.",
    address: "서울특별시 강남구 테헤란로 123 아토키토 빌딩 2층"
  }
};