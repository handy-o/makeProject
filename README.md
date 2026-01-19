### 테스트계정

- 이메일: dond@donday.com
- 비밀번호: 123123
- 이름: 김돈디
- 전화번호: 111-2222-3333


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000/donday](http://localhost:3000/donday) with your browser to see the result.
- **메인 화면** [http://localhost:3000/donday](http://localhost:3000/donday)
- **로그인 화면** [http://localhost:3000/login](http://localhost:3000/login)
- **회원가입 화면** [http://localhost:3000/signup](http://localhost:3000/singup)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database & Auth**: Supabase
- **Styling**: CSS Modules / Global CSS
- **State Management**: Zustand (또는 Redux - `store` 폴더 기반)

```
DODODAY/
├── app/ # Next.js App Router (페이지 및 API 로직) - 사용x
│ ├── admin/write/ # 관리자 글쓰기 페이지
│ ├── login/ # 로그인 페이지
│ ├── signup/ # 회원가입 페이지
│ ├── search/ # 검색 결과 페이지
│ └── layout.tsx # 전체 레이아웃
├── components/ # 공통 UI 컴포넌트 (Banner, CardSlider, Title 등)
├── containers/ # 비즈니스 로직이 포함된 컨테이너 컴포넌트
├── lib/ # 유틸리티 함수 및 설정 (supabase.ts, AverageColor.ts)
├── store/ # 전역 상태 관리 (Zustand/Redux 설정)
├── hook/ # 커스텀 훅
└── public/ # 정적 이미지 및 자산
```

## 🛠 주요 라이브러리 활용 (Dependencies)

프로젝트의 핵심 기능을 구현하기 위해 다음 도구들을 활용했습니다.

### 📝 Content & Editor

- **Tiptap**: 사용자 정의가 가능한 풍부한 텍스트 에디터 경험을 제공합니다.
- **Lucide React**: 직관적인 UI 아이콘 시스템을 구축했습니다.

### 🎨 Design & Interaction

- **Tailwind CSS v4**: 최신 버전의 Tailwind를 사용하여 고도로 최적화된 스타일링을 적용했습니다.
- **Swiper**: 부드러운 반응형 슬라이더 컴포넌트를 구현했습니다.
- **Fast Average Color**: 이미지의 주요 색상을 분석하여 UI 디자인의 몰입감을 높였습니다.

### ⚙️ State & Backend

- **Zustand**: 복잡한 상태 로직을 단순하게 관리하여 렌더링 성능을 최적화했습니다.
- **Supabase**: 실시간 데이터베이스 연동과 사용자 인증을 안전하게 처리합니다.
