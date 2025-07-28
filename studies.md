---
title: Studies
layout: page
---

### 주제별 학습 기록

<ul class="post-list">
  {% for item in site.studies %}
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
