### Gemini CLI 작업 기록: MyProfile 프로젝트

이 문서는 Gemini CLI가 MyProfile 프로젝트에서 수행한 작업과 최종 상태를 기록합니다.

---

### 1. 프로젝트 개요 및 목표

*   **프로젝트 유형**: Jekyll 기반의 개인 프로필 웹사이트
*   **주요 목표**: 안정적인 Jekyll 환경 구축, GitHub Pages를 통한 배포, 깔끔한 디자인 적용, 크로스 플랫폼 호환성 확보, 효율적인 워크플로우 제공.

---

### 2. Git 작업 정책

*   **커밋**: Gemini CLI는 코드 변경 사항을 커밋합니다.
*   **푸시**: 원격 저장소로의 푸시는 **사용자께서 직접 수행**해야 합니다. (CLI 환경 제약)

---

### 3. 최종 프로젝트 상태 및 워크플로우

현재 MyProfile 프로젝트는 사용자님의 모든 요청을 반영하여 다음과 같은 상태로 완성되었습니다.

*   **Jekyll 환경 안정화**: 로컬에서 Jekyll 사이트가 성공적으로 빌드되며, 필요한 모든 젬 의존성이 해결되었습니다.
*   **GitHub Pages 오류 해결**: `index of /` 오류는 사용자님의 확인에 따라 해결되었습니다. GitHub Pages 설정(`main` 브랜치, `/(root)` 폴더)이 올바르게 되어 있음을 전제로 합니다.
*   **사이트 스타일 적용**: `assets/css/style.css`에 가독성과 깔끔함을 개선하는 CSS 규칙이 적용되었습니다.
*   **콘텐츠 복구 및 정리**: 이전에 삭제되었던 주요 콘텐츠 파일들이 모두 복구되었으며, 불필요한 잔여 파일(`_site/fun`, `.DS_Store`)은 제거되었습니다.
*   **문서화 완료**: `README.md`에 로컬 미리보기 지침이 명확히 추가되었고, 이 `.gemini/gemini.md` 파일에 모든 작업 기록과 향후 워크플로우가 상세히 문서화되었습니다.
*   **크로스 플랫폼 호환성**: Windows 환경에서의 설정 및 워크플로우 지침이 제공되었습니다.

**향후 워크플로우 (사용자 수행 필요)**:

1.  **로컬 미리보기**: `README.md`의 지침에 따라 로컬 서버를 실행하여 변경 사항을 미리 확인합니다. (예: `BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --port 4000`)
2.  **사이트 콘텐츠 검증**: 로컬 서버에서 웹사이트의 타이틀, 푸터 이메일, 접기 목록, 전반적인 레이아웃 등을 직접 확인합니다.
3.  **Ruby 및 젬 업데이트**: Jekyll 4.4는 Ruby 2.7.0 이상을 요구합니다. `rbenv`를 통해 Ruby 3.3.3을 사용하도록 설정하고 `bundle update`를 실행하여 젬을 최신 상태로 유지합니다.
    ```bash
    rbenv local 3.3.3
    export BUNDLE_PATH=vendor/bundle
    bundle update
    ```
4.  **콘텐츠 관리**: `_posts`, `_pages` 등 해당 디렉토리에 마크다운 파일을 생성하거나 수정하여 콘텐츠를 추가합니다.
5.  **Git 푸시**: 변경 사항을 커밋한 후 GitHub에 푸시하여 웹사이트를 업데이트합니다.

---

### 4. 환경 개요 및 파일 구조

**프로젝트 루트 디렉토리 (`/Users/pargamer/GitHub/repos/MyProfile/`)**

```
MyProfile/
├── _config.yml
├── .gitignore
├── index.md
├── README.md
├── Gemfile
├── Gemfile.lock
├── .ruby-version
├── .gemini/ (이 작업 기록 파일 포함)
├── _includes/
├── _layouts/
├── _pages/
├── _posts/
├── assets/
├── projects/
├── studies/
└── vendor/ (로컬 Ruby 젬 설치 경로)
```

**주요 환경 설정 파일:**

*   `_config.yml`: Jekyll 사이트의 전역 설정 (제목, 설명, 플러그인, 제외 파일 등).
*   `Gemfile`: Ruby 젬 의존성 관리 (Jekyll 및 플러그인 버전 지정).
*   `.gitignore`: Git이 추적하지 않을 파일 및 디렉토리 지정 (`_site/`, `vendor/` 등).
*   `.ruby-version`: `rbenv`가 이 프로젝트에서 사용할 Ruby 버전을 지정.

**외부 환경 파일 (Gemini CLI가 직접 수정 불가):**

*   `~/.zshrc`: 셸 환경 설정 파일. `rbenv` 초기화 및 PATH 설정이 포함되어야 합니다. (사용자께서 직접 관리)

---

### 5. 크로스 플랫폼 호환성 (Windows)

Windows 환경에서 이 저장소를 클론하고 워크플로우를 이어갈 수 있도록 필요한 사항을 안내합니다.

*   **Git 설치**: Git for Windows 설치 (Git Bash 포함).
*   **Ruby 설치**: RubyInstaller for Windows 설치 (MSYS2 개발 툴킷 포함).
    *   설치 시 `Add Ruby executables to your PATH` 옵션 선택.
    *   MSYS2 개발 툴킷 설치 시 `ridk install` 명령을 통해 필요한 개발 도구 설치.
*   **Bundler 설치**: `gem install bundler` 명령으로 Bundler 설치.
*   **프로젝트 클론**: `git clone [저장소 URL]`
*   **의존성 설치**: 프로젝트 디렉토리로 이동하여 다음 명령 실행.
    ```bash
    bundle install --path vendor/bundle
    ```
    (Windows에서는 `BUNDLE_PATH` 환경 변수 설정 대신 `--path` 옵션을 사용하는 것이 더 일반적입니다.)
*   **Jekyll 서버 실행**:
    ```bash
    bundle exec jekyll serve --port 4000
    ```
    (Windows에서도 포트 충돌 시 `--port` 옵션으로 다른 포트 지정 가능)

---

### 6. 스타일 규칙 적용

`assets/css/style.css` 파일에 폰트, 기본 색상, 본문 여백, 줄 간격, 링크 스타일 등 전반적인 가독성과 깔끔함을 개선하는 CSS 규칙을 적용했습니다.

*   **세부 변경 사항 요약**:
    *   `body`: 폰트, 줄 간격, 색상, 배경색, 여백 조정.
    *   `.wrapper`: 최대 너비 및 내부 여백 설정.
    *   `header`: 하단 테두리 및 여백 추가.
    *   `nav a`: 밑줄 제거, 볼드체, 호버 효과 추가.
    *   `.post-list li`: 항목 간 여백 및 하단 점선 테두리 추가.
    *   `.site-footer`: 중앙 정렬, 여백, 상단 테두리, 색상, 폰트 크기 조정 및 링크 스타일 추가.

이 모든 과정을 `.gemini/gemini.md`에 기록했습니다.
