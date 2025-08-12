# frozen_string_literal: true

source "https://rubygems.org"

# Ruby 버전 명시 (현재 설치된 버전)
ruby "3.3.3"

# Jekyll 최신 안정 버전으로 업그레이드
gem "jekyll", "~> 4.3.4"

# Jekyll 핵심 플러그인들 최신 버전
gem "jekyll-feed", "~> 0.17.0"
gem "jekyll-seo-tag", "~> 2.8.0"
gem "jekyll-sitemap", "~> 1.4.0"

# 마크다운 파서 (GitHub Flavored Markdown 지원)
gem "kramdown-parser-gfm", "~> 1.1.0"

# 사이트 최적화 플러그인
gem "jekyll-lazy-load-image", "~> 0.3.3"
gem "jekyll-search", "~> 0.2.0", group: :jekyll_plugins

# 테마 - Minima 최신 버전
gem "minima", "~> 2.5.2"

# Ruby 3.3+ 호환성을 위한 필수 gem들
gem "base64", "~> 0.3.0"
gem "bigdecimal", "~> 3.2.2"
gem "csv", "~> 3.3.5"

# 성능 향상을 위한 추가 gem들
gem "webrick", "~> 1.9.1"  # Ruby 3.0+ 필수
gem "rexml", "~> 3.4.1"    # Ruby 3.0+ 필수

# 개발 및 테스트용 gem들
group :development, :test do
  gem "html-proofer", "~> 5.0.9"  # HTML 검증
end
