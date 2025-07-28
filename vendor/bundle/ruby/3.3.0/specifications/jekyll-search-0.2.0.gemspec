# -*- encoding: utf-8 -*-
# stub: jekyll-search 0.2.0 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll-search".freeze
  s.version = "0.2.0".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Chris Mytton".freeze]
  s.bindir = "exe".freeze
  s.date = "2016-06-02"
  s.email = ["chrismytton@gmail.com".freeze]
  s.homepage = "https://github.com/everypolitician/jekyll-search".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "2.5.1".freeze
  s.summary = "Add JavaScript based search across collections on your Jekyll site".freeze

  s.installed_by_version = "3.5.11".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<jekyll>.freeze, [">= 3".freeze])
  s.add_development_dependency(%q<bundler>.freeze, ["~> 1.10".freeze])
  s.add_development_dependency(%q<rake>.freeze, ["~> 10.0".freeze])
  s.add_development_dependency(%q<minitest>.freeze, [">= 0".freeze])
  s.add_development_dependency(%q<pry>.freeze, [">= 0".freeze])
end
