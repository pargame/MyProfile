#git 명령 금지
내가 깃허브 데스크톱으로 알아서 커밋 푸시 할거야. 넌 관리하지마.

# Gemini-CLI 지침

*   **목표:** GitHub Pages 블로그에 포트폴리오 및 자기소개
*   **주제:** 언리얼 엔진 학습, 프로젝트, 자기소개
*   **Jekyll 테마:** Minima
*   **별칭:** 이 `.gemini/gemini.md` 파일은 '메모'라고 부릅니다.
*   **작업 방식:** Jekyll의 마크다운 변환기(kramdown)를 고려하여 마크다운을 작성합니다.
*   **스타일:** 소제목은 `<h3>` 태그 등을 사용하여 눈에 띄게 큰 크기로 작성합니다.
*   **제 역할:** 제가 받은 텍스트를 마크다운 파일로 만들어 제공하기
*   **참고:** `local.md`는 gitignore 처리된 파일로, 저에게 전달할 텍스트를 미리 작성하는 용도입니다.
*   **규칙:** `local.md`의 텍스트를 마크다운 페이지로 옮긴 후에는, `local.md` 파일을 비웁니다.

---

### 사이트 계층 구조

*   **index.md** (메인 페이지)
    *   **about.md** (소개)
    *   **games.md** (즐긴 게임)
    *   **projects.md** (프로젝트 목록)
        *   `Project_Sprint.md`
        *   `AI_Python.md`
        *   `Vibe_Coding.md`
    *   **studies.md** (스터디 목록)
        *   `UnrealEngine.md`
        *   `Algorithm.md`
        *   `C++.md`
        *   `AI.md`