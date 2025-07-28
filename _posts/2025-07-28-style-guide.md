---
layout: post
title:  "콘텐츠 작성 가이드 (마크다운 예시)"
date:   2025-07-28 11:00:00 +0900
categories: guide
tags:
  - Jekyll
  - Markdown
  - guide
---

이 페이지는 Jekyll 블로그에 글을 작성할 때 사용할 수 있는 마크다운(Markdown) 문법의 예시입니다. 이 파일을 복사하여 새 글을 작성하시면 편리합니다.

---

# 제목 1 (h1)
## 제목 2 (h2)
### 제목 3 (h3)
#### 제목 4 (h4)

---

### 텍스트 스타일

*기울임* 또는 _기울임_
**굵게** 또는 __굵게__
**_굵고 기울임_**
~~취소선~~

---

### 목록

**순서 없는 목록:**
* 항목 1
* 항목 2
  * 중첩된 항목 2.1
  * 중첩된 항목 2.2

**순서 있는 목록:**
1. 첫 번째 항목
2. 두 번째 항목
3. 세 번째 항목

---

### 링크

[여기를 클릭하면 구글로 이동합니다.](https://www.google.com)

---

### 이미지

`assets/images` 폴더에 이미지를 넣고 다음과 같이 연결할 수 있습니다.

![임시 파비콘 이미지]({{ "/assets/images/favicon.svg" | relative_url }})

---

### 인용문

> "이것은 인용문입니다. 다른 사람의 말을 인용할 때 사용합니다."
> - 출처

---

### 코드 블록

인라인 코드는 `이렇게` 표시합니다.

여러 줄로 된 코드 블록은 언어를 지정하여 구문 강조(syntax highlighting)를 적용할 수 있습니다.

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}
```

```python
def hello():
    print("Hello, Python!")
```

---

### 태그 (Tags)

게시물에 카테고리보다 더 세부적인 키워드를 부여하고 싶을 때 태그를 사용합니다. YAML Front Matter에 다음과 같이 `tags` 목록을 추가할 수 있습니다.

```yaml
---
layout: post
title: "My First Post"
tags:
  - C++
  - Algorithm
  - "Problem Solving"
---
```

하나의 게시물에 여러 개의 태그를 붙일 수 있으며, 태그에 공백이 포함될 경우 따옴표로 감싸주세요.

---

### 수평선

페이지의 섹션을 나눌 때 사용합니다.

---
