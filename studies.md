---
title: Studies
layout: page
---

### 주제별 학습 기록

{% assign grouped_studies = site.studies | group_by_exp: "item", "item.dir | remove_first: '/studies/' | default: 'General Studies'" %}

{% for group in grouped_studies %}
  {% assign group_name_raw = group.name %}
  {% assign display_group_name = group_name_raw | replace: '-', ' ' | replace: '_', ' ' | capitalize %}

  <details {% if group_name_raw == "UnrealEngine" %}open{% endif %}>
    <summary>
      <h3>{{ display_group_name }}</h3>
    </summary>
    <ul class="post-list">
      {% for item in group.items %}
        <li>
          <h4>
            <a class="post-link" href="{{ item.url | relative_url }}">
              {{ item.title }}
            </a>
          </h4>
          <p>{{ item.content | strip_html | truncatewords: 50 }}</p>
        </li>
      {% endfor %}
    </ul>
  </details>
{% endfor %}
