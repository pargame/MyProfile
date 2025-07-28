# -*- encoding: utf-8 -*-
# stub: jekyll-lazy-load-image 0.3.3 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-lazy-load-image".freeze
  s.version = "0.3.3".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tadayuki Onishi".freeze]
  s.date = "2021-02-28"
  s.email = ["tt.tanishi100@gmail.com".freeze]
  s.homepage = "https://github.com/kenchan0130/jekyll-lazy-load-image".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.4.0".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Edit img tag optimized lazy load images for your Jekyll site".freeze

  s.installed_by_version = "3.5.11".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3.8".freeze])
  s.add_runtime_dependency(%q<nokogiri>.freeze, ["~> 1.8".freeze])
  s.add_development_dependency(%q<bundler>.freeze, ["~> 2.0".freeze])
end
