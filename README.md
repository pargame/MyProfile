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

필요시 더 자세한 개발 메모는 `CONTRIBUTING.md`를 참고하세요.
