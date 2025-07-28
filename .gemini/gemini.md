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

---

### **3. 현재 사이트 구성 및 주요 기능 (2025-07-28 기준)**

*   **콘텐츠 구조**:
    *   **컬렉션 기반**: `Projects`와 `Studies`는 Jekyll의 컬렉션(`_projects`, `_studies`) 기능으로 관리되어 확장성이 용이함.
    *   **블로그 게시물**: `_posts` 폴더에 마크다운 파일로 작성. 카테고리 기능 활성화.
    *   **정적 페이지**: `about.md`, `index.md` 등.

*   **디자인 및 레이아웃**:
    *   **테마**: `minima` 테마 기반의 `dark` 스킨 사용.
    *   **커스텀 스타일**: `assets/css/custom.css` 파일을 통해 게시물 포함 모든 페이지에 일관된 'Pure Black' 테마 적용 완료.
    *   **홈페이지**: 최신 게시물 목록을 보여주는 `home` 레이아웃 사용.

*   **주요 기능**:
    *   **SEO**: `jekyll-seo-tag` 플러그인을 통해 모든 페이지에 검색 엔진 최적화용 메타 태그 자동 생성.
    *   **RSS 피드**: `jekyll-feed` 플러그인을 통해 `/feed.xml` 경로에 RSS 피드 자동 생성.
    *   **파비콘**: `assets/images/favicon.svg` 파일이 사이트 아이콘으로 적용됨.
    *   **댓글 시스템**: **Disqus** 연동 기능 추가. `_config.yml`에 사용자의 `shortname`을 입력하면 모든 게시물에 댓글 창 활성화.

*   **사용자 경험 (UX)**:
    *   **콘텐츠 작성 가이드**: `_posts`에 마크다운 문법 예시가 포함된 가이드 게시물(`2025-07-28-style-guide.md`)을 추가하여 콘텐츠 작성을 도움.
    *   **README**: `bundle install` 및 `bundle exec jekyll serve`를 사용하는 표준화된 프로젝트 실행 방법으로 `README.md` 업데이트 완료.

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
├── .gitignore          # Git 추적 제외 목록
├── Gemfile             # Ruby Gem 의존성 목록
├── _posts/             # 블로그 게시물
├── _projects/          # 'Projects' 컬렉션
├── _studies/           # 'Studies' 컬렉션
├── assets/
│   ├── css/custom.css  # 커스텀 테마 CSS
│   └── images/favicon.svg # 사이트 파비콘
├── _includes/          # 재사용 HTML 조각
├── _layouts/           # 페이지 기본 구조
└── README.md           # 프로젝트 실행 및 개요
```
