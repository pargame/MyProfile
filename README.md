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

이 블로그는 `In:` 속성을 사용한 자동 분류 시스템을 통해 쉽고 유연한 콘텐츠 관리를 지원합니다. 자세한 내용은 아래 섹션을 참고하세요.

---

## ⚙️ 주요 설정

*   **전역 설정**: 사이트 제목, 저자, 버전 등 대부분의 주요 설정은 `_config.yml` 파일에서 관리합니다.
*   **네비게이션**: 헤더 네비게이션에 표시되는 페이지는 `_config.yml`의 `header_pages` 목록에서 관리합니다.
*   **스타일**: 기본적인 스타일은 `assets/main.scss` 파일에 정의되어 있으며, 추가적인 커스텀 스타일은 `assets/css/custom.css` 파일에서 관리할 수 있습니다.
