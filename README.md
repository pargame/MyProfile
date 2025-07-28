# Pargame's Blog - A Jekyll-powered Personal Blog

이곳은 Jekyll로 구축된 Pargame의 개인 기술 블로그 및 포트폴리오 저장소입니다.

## ✨ 주요 기능

*   **콘텐츠 자동 분류**: `_studies` 및 `_projects` 폴더의 콘텐츠는 각 파일의 `In:` 속성을 기준으로 자동으로 분류됩니다.
*   **반응형 UI**: `details` 태그를 활용한 접기/펼치기 목록으로 가독성을 높였습니다.
*   **자동 버전 관리**: 사이트 하단 푸터에 `_config.yml`의 버전과 최신 Git 커밋 해시가 자동으로 표시됩니다.
*   **편의 기능**: 검색, 이미지 지연 로딩, 다크 모드 등 사용자 편의 기능을 제공합니다.

---

## 🚀 로컬에서 실행하기

로컬 환경에서 사이트를 실행하고 변경사항을 미리 보려면 Ruby와 Bundler가 설치되어 있어야 합니다.

1.  **저장소 복제:**
    ```bash
    git clone https://github.com/pargame/MyProfile.git
    cd MyProfile
    ```

2.  **의존성 설치:**
    ```bash
    bundle install
    ```

3.  **로컬 서버 실행:**
    ```bash
    bundle exec jekyll serve
    ```
    서버가 실행되면 터미널에 `Server address: http://127.0.0.1:4000/`와 같은 메시지가 나타납니다. 이 주소로 접속하여 사이트를 확인할 수 있습니다.

    서버를 중지하려면 터미널에서 `Ctrl + C`를 누르세요.

---

## ✍️ 콘텐츠 관리 방법

이 블로그는 두 가지 주요 방식으로 콘텐츠를 관리합니다.

### 1. 일반 게시물 (`_posts`)

일상적인 기록, 단발성 팁, 생각 등을 작성하는 공간입니다. `Categories`와 `Tags` 페이지를 통해 분류되고 탐색됩니다.

**✅ 새 게시물 작성 절차:**

1.  **파일 생성**: `_posts` 폴더 안에 파일을 생성합니다.
2.  **파일명 규칙**: `YYYY-MM-DD-your-post-title.md` 형식을 반드시 따라야 합니다.
    *   예시: `2025-08-15-my-awesome-post.md`
3.  **머리말(Front Matter) 작성**: `title`, `categories`, `tags` 등을 설정합니다. `layout: post`는 자동으로 적용되므로 생략해도 됩니다.

    ```yaml
    ---
    title: "나의 멋진 게시물 제목"
    date: 2025-08-15 10:00:00 +0900
    categories: Tech # 단일 카테고리 권장
    tags: [Jekyll, "Web Dev"] # 여러 태그 가능
    author: "YourName" # 선택 사항
    ---

    여기에 내용을 작성하세요.
    ```

### 2. Studies & Projects

깊이 있는 주제나 시리즈물을 체계적으로 관리하는 공간입니다. 각 목록 페이지에서 `In:` 속성을 기준으로 자동 분류됩니다.

**✅ 새 콘텐츠 추가 절차:**

1.  **파일 생성**: `_studies/` 또는 `_projects/` 폴더 안에 `.md` 파일을 생성합니다. 폴더 구조는 자유롭게 구성할 수 있습니다.
2.  **머리말(Front Matter) 작성**: `title`과 `In` 속성을 반드시 포함하여 작성합니다.

    ```yaml
    ---
    title: "새로운 콘텐츠 제목"
    In: MyCategory
    ---
    ```

### 3. 게시글 내 접기/펼치기 기능

게시글 안에서 내용 일부를 접으려면 `<details markdown="1">` 태그를 사용하세요. 자세한 사용법은 `.gemini/gemini.md` 가이드를 참고할 수 있습니다.

---

## ⚙️ 주요 설정

*   **전역 설정**: 사이트 제목, 저자, 버전 등 대부분의 주요 설정은 `_config.yml` 파일에서 관리합니다.
*   **네비게이션**: 헤더 네비게이션에 표시되는 페이지는 `_config.yml`의 `header_pages` 목록에서 관리합니다.
*   **스타일**: 기본적인 스타일은 `assets/main.scss` 파일에 정의되어 있으며, 추가적인 커스텀 스타일은 `assets/css/custom.css` 파일에서 관리할 수 있습니다.
