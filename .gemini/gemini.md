# MyProfile 프로젝트 Gemini 작업 기록

> 이 문서는 Gemini CLI가 MyProfile 프로젝트에서 수행한 모든 작업과 최종 상태, 그리고 향후 작업을 위한 핵심 원칙을 기록한 **마스터 핸드오버 문서**입니다. 다음 Gemini 에이전트는 작업을 시작하기 전, 반드시 이 문서 전체를 숙지해야 합니다.

---

### **1. 프로젝트 정보**

*   **프로젝트명**: MyProfile 개인 블로그
*   **저자**: pargame
*   **GitHub 저장소**: `https://github.com/pargame/MyProfile`
*   **목표**: Jekyll 기반의 안정적이고 일관된 디자인을 갖춘 개인 포트폴리오 및 블로그 구축.

---

### **2. 시스템 환경 및 버전 정보**

*   **Ruby 버전**: `.ruby-version` 파일에 명시된 버전을 따름.
*   **주요 Gems**: `Gemfile` 및 `Gemfile.lock`에 의해 관리됨.
    *   `jekyll`
    *   `minima` (테마)
    *   `jekyll-feed` (RSS)
    *   `jekyll-seo-tag` (SEO)
    *   `jekyll-sitemap` (Sitemap 생성)
*   **주의사항**: `bundle install` 실행 시 `Ruby Sass`의 지원 종료(end-of-life) 경고가 표시됩니다. 현재 빌드에 문제는 없으나, 향후 `sassc`로의 마이그레이션을 고려할 수 있습니다.

---

### **3. 현재 사이트 구성 및 주요 기능 (2025-07-28 최종)**

*   **콘텐츠 복구**:
    *   `bf7794a` 커밋 과정에서 유실되었던 `_projects` 및 `_studies` 컬렉션의 원본 콘텐츠를 Git 히스토리에서 성공적으로 복원 완료.

*   **콘텐츠 구조**:
    *   **컬렉션 기반**: `Projects`와 `Studies`는 Jekyll의 컬렉션(`_projects`, `_studies`) 기능으로 관리.
    *   **블로그 게시물**: `_posts` 폴더에 작성. **카테고리** 및 **태그** 기능 완벽 지원.
    *   **정적 페이지**: `about.md`, `index.md`, `categories.md`, `tags.md` 등.

*   **디자인 및 레이아웃**:
    *   **테마**: `minima` 테마 기반의 `dark` 스킨 사용.
    *   **커스텀 스타일**: `assets/css/custom.css`를 통해 **완전한 다크 테마** 구현. 코드 블록, 인용문, 테이블 등 모든 요소의 색상 충돌 문제를 해결하고 일관성을 확보함.
    *   **홈페이지**: 최신 게시물 목록을 보여주는 `home` 레이아웃 사용.
    *   **푸터**: 아이콘 기반의 소셜 링크(이메일, GitHub)와 저작권 정보가 표시되도록 간결하게 재디자인 완료.

*   **주요 기능**:
    *   **탐색 시스템**:
        *   **카테고리**: `/categories`에서 전체 카테고리 목록을 확인하고, 각 게시물에서 `/category/카테고리명`으로 이동 가능.
        *   **태그**: `/tags`에서 전체 태그 목록을 확인하고, 각 게시물에서 `/tag/태그명`으로 이동 가능.
    *   **SEO (검색 엔진 최적화)**:
        *   `jekyll-seo-tag`: 모든 페이지에 SEO용 메타 태그 자동 생성.
        *   `jekyll-sitemap`: 검색 엔진 제출용 `sitemap.xml` 파일 자동 생성.
    *   **RSS 피드**: `jekyll-feed` 플러그인을 통해 `/feed.xml` 경로에 RSS 피드 자동 생성.
    *   **댓글 시스템**: **Disqus** 연동 기능 추가. `_config.yml`에 `shortname` 입력 시 활성화.

*   **사용자 경험 (UX)**:
    *   **콘텐츠 작성 가이드**: `_posts`의 가이드 게시물에 **태그 사용법**을 포함하여 최신화 완료.
    *   **README**: 표준화된 프로젝트 실행 방법으로 `README.md` 업데이트 완료.

---

### **4. Gemini 작업 원칙 (필독)**

1.  **[사용자 제약사항] 무료 플랜 사용으로 인한 대화 횟수 제한을 인지하고, 한 번의 응답에 최대한 많은 작업을 포함하여 효율적으로 진행한다.**
2.  **[자동커밋] 정책**: 중요한 기능 추가나 수정이 완료된 안정적인 상태에서는, 사용자 요청이 없더라도 `feat:`, `fix:`, `docs:` 등 [Conventional Commits](https://www.conventionalcommits.org/) 규칙에 맞는 접두사를 사용하여 작업을 기록한다.
3.  **Git Push 금지**: **원격 저장소로의 푸시는 사용자가 직접 수행합니다.** Gemini는 절대 `git push`를 실행해서는 안 됩니다.
4.  **기존 기능 보존**: 테마 업데이트나 구조 변경 시, 가장 먼저 사용자가 직접 수정한 파일(`_includes`, `_layouts`, `assets` 등)이 있는지 확인하고, 해당 수정사항이 유실되지 않도록 반드시 백업하거나 새로운 코드에 재적용한다. **기능 퇴행은 절대 없어야 한다.**
5.  **전체적인 통일성 유지**: 특정 페이지 수정 시, 다른 페이지들의 구조를 반드시 확인하여 전체적인 스타일 통일성을 해치지 않는다.
6.  **사용자 정보 존중**: 이메일 주소, GitHub 사용자 이름 등 사용자 고유 정보는 임의로 수정하지 않는다.

---

### **5. 프로젝트 파일 구조 (주요 항목)**

```
MyProfile/
├── _config.yml         # Jekyll 사이트 전역 설정
├── .gemini/
│   └── gemini.md       # (이 파일) Gemini 작업 기록 및 규칙
├── Gemfile             # Ruby Gem 의존성 목록
├── _posts/             # 블로그 게시물 (카테고리, 태그 사용)
├── _projects/          # 'Projects' 컬렉션 (콘텐츠 복원됨)
├── _studies/           # 'Studies' 컬렉션 (콘텐츠 복원됨)
├── assets/
│   ├── css/custom.css  # 완성된 다크 테마 CSS
│   └── images/favicon.svg # 사이트 파비콘
├── category/           # 카테고리 페이지 파일
├── tag/                # 태그 페이지 파일
├── _includes/
│   ├── footer.html     # (중요) 재디자인된 푸터
│   └── social.html     # (중요) 이메일 링크 추가됨
├── _layouts/           # 페이지 기본 구조 (category.html, tag.html 추가)
├── categories.md       # 전체 카테고리 목록 페이지
├── tags.md             # 전체 태그 목록 페이지
└── README.md           # 프로젝트 실행 및 개요
```