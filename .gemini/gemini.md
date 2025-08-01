# Pargame's Blog 최종 가이드 (v2.1)

> 이 문서는 **Pargame's Blog** 프로젝트의 현재 아키텍처와 콘텐츠 관리 방법을 명시한 **핵심 기술 가이드**입니다.
> 향후 모든 작업은 이 문서를 기준으로 진행합니다.

---

### **1. 아키텍처 원칙**

*   **콘텐츠 분리 원칙**: `Articles`(블로그), `Studies`(학습), `Projects`(프로젝트)는 각각 독립된 컬렉션으로 관리하며, 서로의 분류 체계에 영향을 주지 않는다.
*   **분류 체계 단순화**:
    *   `Articles`는 `categories` 속성을 유일한 분류 기준으로 사용한다.
    *   `Studies`와 `Projects`는 `In:` 속성을 유일한 그룹핑 기준으로 사용한다.
    *   **Tag 시스템은 완전히 제거되었다.**
*   **설정 자동화**: `_config.yml`의 `defaults` 설정을 통해 각 컬렉션에 필요한 `layout`이 자동으로 적용되므로, 개별 파일에서 `layout`을 명시할 필요가 없다.

---

### **2. 콘텐츠 관리 시스템 명세**

#### **① Articles (블로그)**

*   **폴더**: `_articles`
*   **목적**: 시간순으로 정렬되는 일반 블로그 게시물.
*   **분류**: `categories` 속성 사용.
*   **Front Matter 형식**:
    ```yaml
    ---
    title: "게시물 제목"
    date: YYYY-MM-DD HH:MM:SS +0900
    categories: CategoryName
    author: "AuthorName"
    ---
    ```

#### **② Studies & Projects (지식 아카이브)**

*   **폴더**: `_studies`, `_projects`
*   **목적**: 주제/프로젝트 단위로 묶이는 지식 아카이브.
*   **그룹핑**: `In:` 속성 사용. 이 값은 `studies.md`, `projects.md` 페이지의 접기/펼치기 UI 그룹명이 된다.
*   **Front Matter 형식**:
    ```yaml
    ---
    title: "학습/프로젝트 제목"
    In: "GroupName"
    author: "AuthorName"
    ---
    ```

---

### **3. 콘텐츠 작성 가이드**

*   **일관성 유지**: 새로운 콘텐츠(`Studies`, `Projects`)를 작성할 때는, 해당 콘텐츠가 속할 `In:` 그룹 내의 다른 게시물들을 먼저 참고해야 한다.
*   **제목 형식**: 기존 게시물들의 제목 형식을 따라 명명한다. (예: `[주제] 개념`, `[기능] 구현 방법`)
*   **본문 구조**: 기존 게시물들의 서론, 본론, 결론 및 소제목 구조를 참고하여 전체적인 통일성을 유지한다.
*   **AI 작성 요청 시**: AI에게 콘텐츠 작성을 요청할 경우, 위 가이드라인을 준수하도록 명확히 지시해야 한다.

---

### **4. 주요 파일 요약**

*   `_config.yml`: 사이트 전역 설정 및 컬렉션, `defaults` 정의.
*   `README.md`: 프로젝트의 개요와 사용자 관점의 가이드.
*   `categories.md`: `site.articles` 컬렉션만을 대상으로 카테고리 목록을 생성.
*   `studies.md` / `projects.md`: 각각 `site.studies`와 `site.projects` 컬렉션을 `In:` 속성으로 그룹핑하여 목록 생성.
*   `search.json`: 모든 컬렉션(`articles`, `studies`, `projects`)의 콘텐츠를 통합 검색 대상으로 합니다. 검색 결과 표시를 위해 동적으로 `meta` 필드를 생성하며, `search.md`는 `site.baseurl`을 통해 이 파일을 참조하여 GitHub Pages 호환성을 보장합니다.

---

### **5. 로컬 개발 환경 설정**

1.  **의존성 설치**: 프로젝트 루트에서 `bundle install` 명령을 실행하여 `Gemfile`에 명시된 모든 의존성을 설치한다.
2.  **로컬 서버 실행**: `bundle exec jekyll serve` 명령을 실행하여 로컬 서버를 구동한다.
    *   기본적으로 `http://127.0.0.1:4000` 주소로 사이트를 확인할 수 있다.

이 가이드는 프로젝트의 최종 상태를 반영하며, 향후 모든 작업의 기준이 됩니다.
