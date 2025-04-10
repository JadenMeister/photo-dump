# 📸 PhotoDump (가제) - README

## 🧭 프로젝트 개요
PhotoDump은 사용자가 여행 중 촬영한 사진을 세계 지도 위에 업로드하여 해당 국가를 사진으로 채워나가는 인터랙티브한 플랫폼입니다.
시각적이고 감성적인 여행 기록 방식으로, 사용자의 세계 여행을 독려하고 공유합니다.

---

## 🚀 기술 스택

| 파트 | 기술 | 설명 |
|------|------|------|
| 프론트엔드 | React + Vite | 빠른 빌드 환경과 컴포넌트 기반 UI |
| 백엔드 | Node.js + Express | RESTful API 설계 |
| DB | MySQL + Docker + Workbench | 유저 / 사진 데이터 저장 |
| 버전관리 | GitHub | 협업 및 버전 관리 |
| 개발도구 | WebStorm | 생산성 높은 개발환경 |
| 이미지 포맷 | `.webp` 예정 | 고효율 이미지 압축 포맷 |


---

## 🌟 핵심 기능

- 🌍 세계 지도 기반 UI (국가별 클릭 및 업로드)
- 🖼 나라별 사진 업로드 및 미리보기 (base64 저장, `.webp` 변환 예정)
- 🧷 지도 위 사진 마커 (썸네일 마커 + offset 격자 배치)
- 📊 업로드 수 시각화 (컬러 또는 썸네일 증가)
- 🔍 대륙 필터 기능 (아시아, 유럽 등)
- 🔐 회원 기능 (가입, 로그인, 탈퇴, 세션 기반 인증)
- 🛠 관리자 기능 (유저/사진 관리, 통계 조회)

---

## 🔒 보안 사항

- SQL Injection 방지: Prepared Statements
- 파일 업로드 보안: MIME 검사, 용량 제한, `.webp` 강제 변환
- 세션 보안: HttpOnly 쿠키, 인증 미들웨어
- 관리자 인증 라우트 보호
- 사용자 입력 XSS 방지

---

## 🧱 데이터베이스 구조 요약 (ERD)

### users 테이블
- id (PK): 사용자 ID
- username: 로그인 ID
- password: 암호화된 비밀번호
- role: 'user' 또는 'admin'

### photos 테이블
- id (PK): 사진 ID
- user_id (FK): 업로드 유저 ID
- country_name: 업로드한 국가 이름
- photo_data: base64 이미지 데이터
- created_at: 업로드 일시


---

## 🧪 설치 방법

```bash
# 프론트엔드
cd src
npm install
npm run dev

# 백엔드
cd server
npm install
npm run dev

# MySQL (Docker)
docker compose up -d
```

---

## 💬 프로젝트 비전
> 단순한 사진 저장을 넘어서, 사용자 개개인이 "**나만의 여행 지도를 시각적으로 완성**"할 수 있도록 유도하고, 여행의 추억을 시공간 위에 펼쳐보는 감성적인 경험 제공.

---

Made by Jaden / 최정민