# Pargame's Blog - A Jekyll-powered Personal Blog

이곳은 Jekyll로 구축된 Pargame의 개인 기술 블로그 및 포트폴리오 저장소입니다.

## ✨ 핵심 아키텍처

*   **콘텐츠 분리**: `Articles`(블로그), `Studies`(학습), `Projects`(프로젝트) 세 가지 유형으로 콘텐츠를 명확히 분리하여 관리합니다.
*   **분류 체계 단순화**:
    *   `Articles`는 **카테고리(Category)**를 통해 주제별로 분류됩니다.
    *   `Studies`와 `Projects`는 각 문서의 **`In:` 속성**을 기준으로 목록 페이지에서 자동으로 그룹화됩니다.
*   **자동화**: Jekyll의 `collections`와 `defaults` 기능을 활용하여 수동 설정을 최소화하고, Git 커밋 해시를 이용해 버전을 자동으로 표시합니다.

---

## 🚀 시작하기: 나만의 블로그 만들기

이 템플릿은 macOS, Windows, Linux 등 다양한 운영체제에서 동작합니다. 아래 가이드를 따라 당신만의 블로그를 만들어보세요.

### 1. 준비 사항 (Prerequisites)

먼저, 당신의 컴퓨터에 Ruby와 Bundler가 설치되어 있어야 합니다. 설치되어 있지 않다면, 아래 공식 가이드를 따라 설치를 진행해주세요.

*   **[Jekyll 공식 설치 가이드](https://jekyllrb.com/docs/installation/)** (운영체제에 맞는 방법을 선택하세요)

### 2. 블로그 설정 및 실행

1.  **저장소 복제(Clone):** 이 저장소를 당신의 컴퓨터로 복제합니다.
    ```bash
    git clone https://github.com/pargame/MyProfile.git
    cd MyProfile
    ```

2.  **의존성 설치:** 프로젝트에 필요한 모든 Jekyll 플러그인과 라이브러리를 설치합니다.
    ```bash
    bundle install
    ```

3.  **로컬 서버 실행:** 아래 명령어로 Jekyll 서버를 실행하여 실시간으로 변경사항을 확인합니다.
    ```bash
    bundle exec jekyll serve
    ```
    *   서버가 실행되면, 웹 브라우저에서 `http://127.0.0.1:4000` 주소로 접속하여 블로그를 확인할 수 있습니다.

### 3. 나만의 정보로 수정하기 (Customization)

이제 당신의 블로그로 만들기 위해 몇 가지 파일을 수정해야 합니다.

*   **`_config.yml` 파일 열기:**
    *   `title`, `email`, `description`, `github_username` 등의 값을 당신의 정보로 변경하세요.
*   **`about.md` 파일 수정:**
    *   자신을 소개하는 내용을 자유롭게 작성하세요.
*   **기존 콘텐츠 삭제 또는 수정:**
    *   `_articles`, `_studies`, `_projects` 폴더에 있는 예시 파일들을 삭제하거나, 형식을 참고하여 당신만의 콘텐츠로 채워나가세요.

---

## ✍️ 콘텐츠 관리 가이드

이 블로그는 세 가지 독립적인 콘텐츠 유형을 가집니다. 각각의 목적과 작성법을 따라주세요.

### 1. Articles (블로그 게시물)

시간순으로 기록하는 일반적인 블로그 게시물입니다. `_articles` 폴더에 저장되며, `categories` 속성으로 분류됩니다.

**✅ 새 게시물 작성법:**

1.  `_articles` 폴더 안에 `.md` 파일을 생성합니다. (예: `my-new-post.md`)
2.  파일 상단에 아래 형식에 맞춰 머리말(Front Matter)을 작성합니다. `layout: post`는 자동으로 적용되므로 생략합니다.

    ```yaml
    ---
    title: "새로운 블로그 게시물 제목"
    date: 2025-08-15 10:00:00 +0900
    categories: Tech # 게시물의 주제에 맞는 카테고리 (필수)
    author: "YourName"
    ---

    (여기에 내용을 작성하세요...)
    ```

### 2. Studies & Projects (지식 아카이브)

깊이 있는 주제(`_studies`)나 개별 프로젝트(`_projects`)를 체계적으로 정리하는 공간입니다. `In:` 속성으로 그룹화됩니다.

**✅ 새 콘텐츠 추가 절차:**

1.  `_studies` 또는 `_projects` 폴더 안에 `.md` 파일을 생성합니다.
2.  파일 상단에 머리말을 작성합니다. `In:` 속성은 목록 페이지에서 어떤 그룹에 속할지를 결정합니다.

    ```yaml
    ---
    title: "새로운 학습 주제 또는 프로젝트 제목"
    In: "Unreal Engine" # 목록 페이지에서 "Unreal Engine" 그룹에 표시됨 (필수)
    author: "YourName"
    ---

    (여기에 내용을 작성하세요...)
    ```

---

## 💻 사이트 미리보기 및 문제 해결

로컬 서버를 실행하여 변경사항을 실시간으로 확인할 수 있습니다.

1.  **로컬 서버 실행:** 터미널에서 `bundle exec jekyll serve` 명령을 입력합니다.
2.  **사이트 접속:** 웹 브라우저에서 `http://127.0.0.1:4000` 주소로 접속합니다.
3.  **서버 중지:** 터미널에서 `Ctrl + C`를 눌러 서버를 중지할 수 있습니다.

### **"Address already in use" 오류가 발생하나요?**

위 `serve` 명령어 실행 시 이 오류가 표시된다면, 다른 프로그램이 이미 `4000`번 포트를 사용하고 있다는 의미입니다. 아래 방법으로 해당 프로세스를 종료한 후 다시 시도해 보세요.

*   **macOS / Linux:** 터미널에서 `lsof -i :4000`으로 PID(프로세스 ID)를 찾은 뒤 `kill -9 [PID]` 명령으로 종료합니다.
*   **Windows:** 명령 프롬프트에서 `netstat -ano | findstr :4000`으로 PID를 찾은 뒤 `taskkill /F /PID [PID]` 명령으로 종료합니다.