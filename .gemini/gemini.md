# MyProfile 프로젝트 Gemini 작업 기록

> 이 문서는 Gemini CLI가 MyProfile 프로젝트에서 수행한 모든 작업과 최종 상태, 그리고 향후 작업을 위한 핵심 원칙을 기록한 **마스터 핸드오버 문서**입니다. 다음 Gemini 에이전트는 작업을 시작하기 전, 반드시 이 문서 전체를 숙지해야 합니다.

---

### **1. 프로젝트 정보**

*   **프로젝트명**: Pargame's Blog (v1.0.1)
*   **저자**: pargame
*   **GitHub 저장소**: `https://github.com/pargame/MyProfile`
*   **목표**: Jekyll 기반의 안정적이고 최적화된 개인 포트폴리오 및 블로그 구축.

---

### **2. v1.0.1 최종 기능 및 상태 (2025-07-28)**

*   **빌드 시스템**:
    *   **의존성 문제 해결**: `kramdown-parser-gfm` gem을 추가하여 로컬 서버 빌드 오류를 완벽히 해결함.
    *   **플러그인**: `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-lazy-load-image`, `simple-jekyll-search` 플러그인이 모두 정상적으로 설정 및 동작함.

*   **디자인 및 레이아웃**:
    *   **사이트 타이틀**: `_config.yml`의 `title`을 **Pargame**으로 변경하여 사이트 정체성 확립.
    *   **푸터**: 'Contact' 레이블 옆에 이메일 주소는 텍스트로, GitHub는 아이콘으로 명확히 표시되도록 `social.html`과 `custom.css`를 최종 수정.
    *   **RSS 링크 제거**: `home.html` 레이아웃 하단의 'via RSS' 링크를 완전히 제거하여 사용자 혼란 방지.

*   **주요 기능**:
    *   **탐색 시스템**: 카테고리, 태그별 아카이브 페이지 완벽 구축.
    *   **검색**: **Simple-Jekyll-Search**를 이용한 클라이언트 사이드 검색 기능 구현 완료. 상단 네비게이션의 'Search' 메뉴를 통해 접근 가능. (`/search.md`)
    *   **성능 최적화**: **jekyll-lazy-load-image** 플러그인을 적용하여 모든 이미지에 지연 로딩(Lazy Loading)이 자동으로 활성화됨.
    *   **댓글 시스템**: **Disqus** 댓글 창이 기본적으로 보이도록 `_config.yml`에 예시 `shortname`을 추가. 사용자가 실제 값으로 교체하도록 명확한 주석 안내를 추가하여 기능의 가시성과 사용성을 대폭 개선.
    *   **버전 관리**: Git 커밋 해시를 푸터에 `v1.0 (commit: xxxxxx)` 형태로 자동 표시하여 버전 추적이 가능하도록 구현. (`_data/version.yml` 활용)

*   **사용자 경험 (UX)**:
    *   **README**: 프로젝트 실행, 새 게시물 작성법, 검색 기능 사용법 등을 포함한 상세한 사용자 가이드로 전면 개편함.

---

### **3. Gemini 작업 원칙 (필독)**

1.  **[최우선 원칙] 로컬 서버 검증**: 모든 코드 수정 후, **반드시 `bundle exec jekyll serve`로 로컬 서버를 실행하여 변경사항이 의도대로 적용되었는지 눈으로 직접 확인한다.** 정적 분석에만 의존하지 않는다.
2.  **[사용자 제약사항]** 무료 플랜 사용으로 인한 대화 횟수 제한을 인지하고, 한 번의 응답에 최대한 많은 작업을 포함하여 효율적으로 진행한다.
3.  **[자동커밋] 정책**: 중요한 기능 추가나 수정이 완료된 안정적인 상태에서는, 사용자 요청이 없더라도 `feat:`, `fix:`, `docs:` 등 [Conventional Commits](https://www.conventionalcommits.org/) 규칙에 맞는 접두사를 사용하여 작업을 기록한다.
4.  **Git Push 금지**: **원격 저장소로의 푸시는 사용자가 직접 수행합니다.** Gemini는 절대 `git push`를 실행해서는 안 됩니다.
5.  **기존 기능 보존**: 기능 퇴행은 절대 없어야 한다.
6.  **전체적인 통일성 유지**: 사이트의 전체적인 스타일 통일성을 해치지 않는다.
7.  **사용자 정보 존중**: 사용자 고유 정보는 임의로 수정하지 않는다.

---

### **4. 프로젝트 파일 구조 (주요 항목)**

```
MyProfile/
├── _config.yml         # (중요) Jekyll 사이트 전역 설정 (타이틀, 플러그인, Disqus 예시 추가)
├── .gemini/
│   └── gemini.md       # (이 파일) Gemini 작업 기록 및 규칙
├── _data/
│   └── version.yml     # 버전 정보 (커밋 해시)
├── _includes/
│   ├── footer.html     # (중요) 수정된 푸터
│   └── post.html       # (중요) 댓글 기능 안내 추가
├── _layouts/
│   └── home.html       # (중요) RSS 링크 제거
├── assets/
│   └── css/custom.css  # 커스텀 푸터 CSS
├── search.json         # 검색 데이터 파일
├── search.md           # 검색 페이지
└── README.md           # (중요) 상세한 사용자 가이드
```