# Jekyll 블로그 AI 작업 워크플로우

## 프로젝트 개요
이 저장소는 Jekyll 기반 정적 웹사이트로, 개인 블로그, 프로젝트, 스터디 노트, Obsidian 메모를 관리합니다.

## 폴더 구조
- `_articles/`: 블로그 글 (마크다운)
- `_studies/`: 스터디 노트 (마크다운)
- `_projects/`: 프로젝트 (마크다운)
- `_obsidian/`: Obsidian 메모 (마크다운)
- `_layouts/`: 페이지 레이아웃 템플릿 (HTML)
- `_includes/`: 공통 요소 (HTML 조각)
- `assets/`: 스타일시트, 이미지, JS 파일

## AI 작업 워크플로우

### 1. 작업(Work)
- 새 콘텐츠 작성 시 해당 폴더(`_articles/`, `_studies/` 등)에 마크다운 파일 생성
- 모든 마크다운은 반드시 YAML 프론트매터를 포함해야 함:
  ```yaml
  ---
  title: "제목"
  date: YYYY-MM-DD
  categories: [카테고리1, 카테고리2]
  ---
  ```
- Obsidian 링크는 `[[정확한제목]]` 형식 사용
- 코드 블록은 언어 지정 필수: ```python

### 2. 검증(Verify)
- 프론트매터 필수 필드 확인 (title, date)
- Obsidian 링크 형식 확인
- 코드 블록 언어 지정 확인
- 이미지 경로 확인 (상대 경로: `/assets/images/...`)
- 로컬 빌드 테스트: `bundle exec jekyll serve`

### 3. 커밋(Commit)
- 커밋 메시지 형식:
  ```
  [콘텐츠타입]: 주제/제목
  
  상세 설명
  ```
  예시: `[article]: Jekyll 블로그 설정하기`
- 변경사항이 여러 개인 경우, 관련 변경사항끼리 묶어서 커밋

## 주의사항
- 코드 변경 시 항상 로컬에서 테스트 후 커밋
- 사이트 구조 변경은 반드시 CONTRIBUTING.md 문서도 함께 업데이트
