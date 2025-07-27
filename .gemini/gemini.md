# Gemini-CLI 프로젝트 지침: MyProfile

이 문서는 Gemini-CLI가 이 프로젝트에서 작업을 수행하는 방식에 대한 규칙과 지침을 정의합니다.

---

### 1. 최상위 규칙 (General Rules)

*   **Git 명령 금지:** Git 관련 모든 작업(commit, push 등)은 사용자가 직접 처리합니다. `git` 명령어를 절대 사용하지 않습니다.
*   **'메모' 별칭:** 이 `.gemini/gemini.md` 파일은 '메모'라고 부릅니다.

---

### 2. 프로젝트 개요 (Project Overview)

*   **목표:** GitHub Pages를 이용한 포트폴리오 및 자기소개 블로그 구축.
*   **주요 주제:** 언리얼 엔진 학습, 개인 프로젝트, 자기소개.
*   **Jekyll 테마:** Minima.

---

### 3. 내 역할 및 작업 절차 (My Role & Workflow)

*   **핵심 역할:** 사용자가 제공하는 텍스트를 마크다운 파일로 변환하고 관리합니다.
*   **`local.md` 사용법:**
    *   `local.md`는 사용자로부터 텍스트를 전달받는 임시 파일입니다. (gitignore 처리됨)
    *   `local.md`의 내용을 지정된 마크다운 페이지로 옮긴 후에는, 반드시 `local.md` 파일을 비워야 합니다.

---

### 4. 콘텐츠 및 구조 규칙 (Content & Structure Rules)

*   **마크다운 처리:** Jekyll의 기본 마크다운 변환기인 **kramdown**의 특성을 고려하여 마크다운을 작성합니다. (예: HTML 블록 내 마크다운 렌더링을 위해 `markdown="1"` 속성 사용)
*   **폴더 구조:** 아래 '사이트 계층 구조'에 명시된 대로, 관련된 페이지는 `projects/`, `studies/` 등의 하위 폴더에 배치합니다.
*   **스타일:** 소제목은 `<h3>` 태그 등을 사용하여 일반 텍스트보다 눈에 띄게 큰 크기로 작성합니다.

---

### 5. 사이트 계층 구조 (Site Hierarchy)

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