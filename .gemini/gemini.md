# MyProfile 프로젝트 Gemini 작업 기록

> 이 문서는 Gemini CLI가 MyProfile 프로젝트에서 수행한 모든 작업과 최종 상태, 그리고 향후 작업을 위한 핵심 원칙을 기록한 **마스터 핸드오버 문서**입니다. 다음 Gemini 에이전트는 작업을 시작하기 전, 반드시 이 문서 전체를 숙지해야 합니다.

---

### **1. 프로젝트 정보**

*   **프로젝트명**: Pargame's Blog (구 MyProfile)
*   **저자**: pargame
*   **GitHub 저장소**: `https://github.com/pargame/MyProfile`
*   **목표**: Jekyll 기반의 안정적이고 최적화된 개인 포트폴리오 및 블로그 구축.

---

### **2. 시스템 환경 및 버전 정보**

*   **Ruby 버전**: `.ruby-version` 파일에 명시된 버전을 따름.
*   **주요 Gems**: `Gemfile` 및 `Gemfile.lock`에 의해 관리됨.
    *   `jekyll`, `minima` (기본)
    *   `jekyll-feed`, `jekyll-seo-tag`, `jekyll-sitemap` (SEO 및 구독)
    *   `kramdown-parser-gfm` (Markdown 파서)
    *   `jekyll-lazy-load-image` (성능 최적화)
*   **주의사항**: `bundle install` 실행 시 `Ruby Sass`의 지원 종료 경고가 표시됩니다. 현재 빌드에 문제는 없으나, 향후 `sassc`로의 마이그레이션을 고려할 수 있습니다.

---

### **3. 현재 사이트 구성 및 주요 기능 (2025-07-28 최종)**

*   **빌드 시스템**:
    *   **의존성 문제 해결**: `kramdown-parser-gfm` gem을 추가하여 로컬 서버 빌드 오류를 완벽히 해결함.

*   **디자인 및 레이아웃**:
    *   **사이트 타이틀**: `_config.yml`의 `title`을 **Pargame**으로 변경하여 사이트 정체성 확립.
    *   **푸터**: 'Contact' 레이블과 소셜 아이콘(GitHub, Email)이 정상적으로 표시되도록 수정. 실용성이 낮은 RSS 링크는 제거하여 UI를 개선함.

*   **주요 기능**:
    *   **탐색 시스템**: 카테고리, 태그별 아카이브 페이지 완벽 구축.
    *   **검색**: **Simple-Jekyll-Search**를 이용한 클라이언트 사이드 검색 기능 구현 완료. (`/search`)
    *   **성능 최적화**: **jekyll-lazy-load-image** 플러그인을 적용하여 모든 이미지에 지연 로딩(Lazy Loading)이 자동으로 활성화됨.
    *   **댓글 시스템**: **Disqus** 연동 기능은 `_posts`에만 적용됨. (`_config.yml`에 `shortname` 입력 시 활성화). 컬렉션 페이지(`_studies`, `_projects`)에는 의도적으로 제외하여 콘텐츠에 집중하도록 구성.

*   **사용자 경험 (UX)**:
    *   **README**: 프로젝트 실행, 새 게시물 작성법, 검색 기능 사용법 등을 포함한 상세한 사용자 가이드로 전면 개편함.

---

### **4. Gemini 작업 원칙 (필독)**

1.  **[사용자 제약사항] 무료 플랜 사용으로 인한 대화 횟수 제한을 인지하고, 한 번의 응답에 최대한 많은 작업을 포함하여 효율적으로 진행한다.**
2.  **[자동커밋] 정책**: 중요한 기능 추가나 수정이 완료된 안정적인 상태에서는, 사용자 요청이 없더라도 `feat:`, `fix:`, `docs:` 등 [Conventional Commits](https://www.conventionalcommits.org/) 규칙에 맞는 접두사를 사용하여 작업을 기록한다.
3.  **Git Push 금지**: **원격 저장소로의 푸시는 사용자가 직접 수행합니다.** Gemini는 절대 `git push`를 실행해서는 안 됩니다.
4.  **기존 기능 보존**: 기능 퇴행은 절대 없어야 한다.
5.  **전체적인 통일성 유지**: 사이트의 전체적인 스타일 통일성을 해치지 않는다.
6.  **사용자 정보 존중**: 사용자 고유 정보는 임의로 수정하지 않는다.

---

### **5. 프로젝트 파일 구조 (주요 항목)**

```
MyProfile/
├── _config.yml         # (중요) Jekyll 사이트 전역 설정 (타이틀, 플러그인 등)
├── .gemini/
│   └── gemini.md       # (이 파일) Gemini 작업 기록 및 규칙
├── Gemfile             # (중요) Ruby Gem 의존성 목록 (최적화 플러그인 추가)
├── _posts/             # 블로그 게시물
├── assets/
│   └── css/custom.css  # 커스텀 테마 CSS
├── _includes/
│   └── footer.html     # (중요) 수정된 푸터
├── search.json         # 검색 데이터 파일
├── search.md           # 검색 페이지
└── README.md           # (중요) 상세한 사용자 가이드
```