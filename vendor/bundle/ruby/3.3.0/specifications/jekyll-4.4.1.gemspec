# -*- encoding: utf-8 -*-
# stub: jekyll 4.4.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll".freeze
  s.version = "4.4.1".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 2.7.0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/jekyll/jekyll/issues", "changelog_uri" => "https://github.com/jekyll/jekyll/releases", "homepage_uri" => "https://jekyllrb.com", "source_code_uri" => "https://github.com/jekyll/jekyll" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tom Preston-Werner".freeze, "Parker Moore".freeze, "Matt Rogers".freeze]
  s.bindir = "exe".freeze
  s.date = "2025-01-29"
  s.description = "Jekyll is a simple, blog aware, static site generator.".freeze
  s.email = ["maintainers@jekyllrb.com".freeze]
  s.executables = ["jekyll".freeze]
  s.extra_rdoc_files = ["README.markdown".freeze, "LICENSE".freeze]
  s.files = ["LICENSE".freeze, "README.markdown".freeze, "exe/jekyll".freeze]
  s.homepage = "https://jekyllrb.com".freeze
  s.licenses = ["MIT".freeze]
  s.rdoc_options = ["--charset=UTF-8".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.7.0".freeze)
  s.rubygems_version = "3.1.6".freeze
  s.summary = "A simple, blog aware, static site generator.".freeze

  s.installed_by_version = "3.5.11".freeze if s.respond_to? :installed_by_version

  s.specification_version = 4

  s.add_runtime_dependency(%q<addressable>.freeze, ["~> 2.4".freeze])
  s.add_runtime_dependency(%q<base64>.freeze, ["~> 0.2".freeze])
  s.add_runtime_dependency(%q<colorator>.freeze, ["~> 1.0".freeze])
  s.add_runtime_dependency(%q<csv>.freeze, ["~> 3.0".freeze])
  s.add_runtime_dependency(%q<em-websocket>.freeze, ["~> 0.5".freeze])
  s.add_runtime_dependency(%q<i18n>.freeze, ["~> 1.0".freeze])
  s.add_runtime_dependency(%q<jekyll-sass-converter>.freeze, [">= 2.0".freeze, "< 4.0".freeze])
  s.add_runtime_dependency(%q<jekyll-watch>.freeze, ["~> 2.0".freeze])
  s.add_runtime_dependency(%q<json>.freeze, ["~> 2.6".freeze])
  s.add_runtime_dependency(%q<kramdown>.freeze, ["~> 2.3".freeze, ">= 2.3.1".freeze])
  s.add_runtime_dependency(%q<kramdown-parser-gfm>.freeze, ["~> 1.0".freeze])
  s.add_runtime_dependency(%q<liquid>.freeze, ["~> 4.0".freeze])
  s.add_runtime_dependency(%q<mercenary>.freeze, ["~> 0.3".freeze, ">= 0.3.6".freeze])
  s.add_runtime_dependency(%q<pathutil>.freeze, ["~> 0.9".freeze])
  s.add_runtime_dependency(%q<rouge>.freeze, [">= 3.0".freeze, "< 5.0".freeze])
  s.add_runtime_dependency(%q<safe_yaml>.freeze, ["~> 1.0".freeze])
  s.add_runtime_dependency(%q<terminal-table>.freeze, [">= 1.8".freeze, "< 4.0".freeze])
  s.add_runtime_dependency(%q<webrick>.freeze, ["~> 1.7".freeze])
end
