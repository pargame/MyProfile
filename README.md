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

### 1. Studies & Projects 관리

`studies`와 `projects` 페이지의 콘텐츠는 각 문서의 **머리말(front matter)**을 기반으로 자동으로 분류됩니다.

**✅ 새로운 콘텐츠 추가 절차:**

1.  **파일 생성**: 해당 컬렉션 폴더(`_studies/` 또는 `_projects/`) 안에 `.md` 파일을 생성합니다. 폴더 구조는 자유롭게 구성할 수 있습니다.
    *   스터디 예시: `_studies/UnrealEngine/MyUnrealStudy.md`
    *   프로젝트 예시: `_projects/MyWebApp.md`

2.  **머리말(Front Matter) 작성**: 파일 상단에 `title`과 `In` 속성을 반드시 포함하여 작성합니다.
    *   `title`: 페이지의 제목
    *   `In`: **콘텐츠 분류명** (이 값을 기준으로 목록 페이지에서 그룹화됨)

    ```yaml
    ---
    title: "새로운 콘텐츠 제목"
    In: MyCategory
    ---

    여기에 내용을 작성하세요.
    ```

3.  **확인**: 로컬 서버를 실행하여 해당 목록 페이지(`http://127.0.0.1:4000/studies/` 또는 `/projects/`)에서 콘텐츠가 'MyCategory' 분류 아래에 잘 나타나는지 확인합니다.

### 2. 게시글 내 접기/펼치기 기능 사용법

게시글(`.md` 파일) 안에서 내용의 일부를 숨기거나 접는 기능을 사용하려면 `<details>` 태그를 활용합니다.

**⚠️ 중요: 마크다운 렌더링을 위해 `markdown="1"` 속성을 반드시 추가해야 합니다.**

**✅ 사용 예시:**

```html
<details markdown="1">
<summary>여기를 클릭하여 내용 보기</summary>

**마크다운 문법이 여기에 적용됩니다.**

- 목록 1
- 목록 2

</details>
```

---

## ⚙️ 주요 설정

*   **전역 설정**: 사이트 제목, 저자, 버전 등 대부분의 주요 설정은 `_config.yml` 파일에서 관리합니다.
*   **네비게이션**: 헤더 네비게이션에 표시되는 페이지는 `_config.yml`의 `header_pages` 목록에서 관리합니다.
*   **스타일**: 기본적인 스타일은 `assets/main.scss` 파일에 정의되어 있으며, 추가적인 커스텀 스타일은 `assets/css/custom.css` 파일에서 관리할 수 있습니다.
