---
title: Search
layout: page
---

<div class="search-container">
  <input type="text" id="search-input" placeholder="Search..." autofocus>
  <ul id="results-container"></ul>
</div>

<!-- 1. Add this JavaScript -->
<script src="https://unpkg.com/simple-jekyll-search@1.10.0/dest/simple-jekyll-search.min.js"></script>

<script>
  var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<li><a href="{url}">{title}</a><span class="search-meta">{date} | {category}</span></li>',
    noResultsText: 'No results found',
    limit: 20,
    fuzzy: false,
    debounceTime: 300
  });
</script>