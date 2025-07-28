---
title: Projects
layout: page
---

### 프로젝트 목록

<ul class="post-list">
  {% for item in site.projects %}
    <li>
      <h3>
        <a class="post-link" href="{{ item.url | relative_url }}">
          {{ item.title }}
        </a>
      </h3>
      <p>{{ item.content | strip_html | truncatewords: 50 }}</p>
    </li>
  {% endfor %}
</ul>
