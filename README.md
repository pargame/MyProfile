## Pargame 블로그/아카이브 (Jekyll)

이 저장소는 Jekyll로 만든 개인 블로그 + 지식 아카이브입니다. 간단히 쓰고, 쉽게 띄우는 걸 목표로 합니다.

### 핵심 구성
- Jekyll 3.10 + Minima(dark)
- 컬렉션: `_articles`(블로그), `_studies`, `_projects`, `_obsidian`
- 그래프 페이지: `_layouts/graph.html`(D3.js + Showdown, Obsidian 링크 시각화)
- 스타일: `assets/main.scss` → `assets/main.css`, 전역 오버라이드 `assets/css/custom.css`

### 로컬 실행
```bash
bundle install
bundle exec jekyll serve
```
VS Code에서 Terminal → Run Task → “Jekyll: Serve”도 가능합니다.

### 글 작성 규칙(요약)
- 모든 문서에 Front Matter(`---`) 필요
- `_articles`: `title`, `date`, `categories`(리스트 가능), `author` 권장
- `_studies`, `_projects`: `title` 필수(폴더 경로로 그룹핑)
- `_obsidian`: `title` 필수, 본문에 `[[정확한제목]]`으로 연결 생성

### 폴더 참고(간단)
- `_config.yml`: 사이트 설정/컬렉션/기본 레이아웃
- `_layouts/*`: `default`, `home`, `post`, `graph` 등 레이아웃
- `_includes/*`: `head`, `header`, `footer` 등 공통 조각
- `assets/*`: 스타일 및 이미지

### 유지보수 팁
- `_site/`는 빌드 산출물입니다(커밋 대상 아님). 필요하면 삭제 후 다시 빌드하세요.
- 그래프 스키마를 바꾸면 Liquid(데이터 생성)와 JS(렌더)를 같이 수정하세요.
- 자잘한 스타일은 `assets/css/custom.css`에서 덮어쓰면 됩니다.

추가로, AI/개발자 온보딩을 위해 Graph 기능만 빠르게 이해할 수 있는 문서를 제공합니다: `docs/AI_ONBOARDING.md`.

필요시 더 자세한 개발 메모는 `CONTRIBUTING.md`를 참고하세요.

### Graph(Obsidian) 아키텍처 요약
- 범위: `_obsidian/**` 파일만 그래프에 포함합니다.
- 페이지: `graph.md` → 레이아웃 `_layouts/graph.html` 사용.
- 자산: 스타일 `assets/css/graph.css`, 스크립트 `assets/js/graph.js`.
- 데이터: `graph-data.json`이 빌드 시 `/graph/data.json`을 생성합니다.
	- 스키마: `{ archives: string[], documents: { [url]: { title, url, archive, collection, links: string[] } } }`
	- 컨텐츠 본문은 포함하지 않고, 클릭 시 해당 페이지를 fetch하여 `.post-content`만 렌더합니다.
- 규칙:
	- Title은 파일명(확장자 제거, 대소문자 유지)으로 결정.
	- 링크는 `[[Wiki Link]]` 문법만 추출. `[[Title|alias]]`, `[[Title#section]]`도 `Title` 기준으로 매칭.
	- Archive는 `_obsidian/` 하위 1레벨 폴더명. 폴더가 없으면 `Root`.
- 확장 방법: 다른 컬렉션을 포함하려면 `graph-data.json` 로직을 확장하고, 링크 매핑 테이블을 함께 생성하세요.

AI 전용 빠른 가이드: `docs/AI_ONBOARDING.md`를 먼저 읽고 수정 범위를 확인하세요.
