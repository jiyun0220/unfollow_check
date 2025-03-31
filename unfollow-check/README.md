# Unfollow Check

GitHub과 Instagram의 맞팔로우 현황을 확인하는 웹 애플리케이션입니다.

## 기능

- GitHub 맞팔로우 체크
  - 사용자의 팔로워/팔로잉 목록 확인
  - 맞팔하지 않은 사용자 표시
- Instagram 맞팔로우 체크 (준비중)

## 기술 스택

- Frontend: React + TypeScript + Vite
- UI: ChakraUI
- APIs: GitHub API, Instagram API(예정)

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 배포

이 프로젝트는 Netlify를 통해 자동 배포됩니다.

### 배포 방법

1. GitHub 저장소에 변경사항을 push합니다.
2. Netlify가 자동으로 변경을 감지하고 배포를 시작합니다.
3. 빌드가 완료되면 자동으로 배포됩니다.

### 수동 배포

```bash
# 프로젝트 빌드
npm run build

# Netlify CLI를 통한 수동 배포 (선택사항)
netlify deploy
```
