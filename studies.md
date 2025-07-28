---
title: Studies
layout: page
---

### 주제별 학습 기록

{% assign grouped_studies = site.studies | group_by_exp: "item", "item.path | split: '/' | slice: 1 | first" %}

{% for group in grouped_studies %}
  {% assign group_name = group.name %}
  {% if group_name == "" %}
    {% assign group_name = "General Studies" %}
  {% else %}
    {% assign group_name = group_name | replace: '_', ' ' | capitalize %}
  {% endif %}

  <details {% if group_name == "Unreal Engine" %}open{% endif %}> {# Unreal Engine 그룹은 기본적으로 열려있도록 설정 #}
    <summary>
      <h3>{{ group_name }}</h3>
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