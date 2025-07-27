# MyProfile

## 로컬에서 사이트 미리보기

Jekyll 사이트를 로컬에서 미리 보려면 다음 단계를 따르세요:

1.  **필요한 젬 설치 (최초 1회 또는 Gemfile 변경 시):**

    ```bash
    BUNDLE_PATH=vendor/bundle bundle install
    ```

2.  **Jekyll 서버 실행:**

    ```bash
    BUNDLE_PATH=vendor/bundle bundle exec jekyll serve --port 4000
    ```

    서버가 시작되면 `http://127.0.0.1:4001` 또는 터미널에 표시되는 주소로 접속하여 사이트를 미리 볼 수 있습니다.

3.  **서버 종료:**

    사이트 확인 후 터미널에서 `Ctrl + C`를 눌러 서버를 종료합니다.

**참고:** `BUNDLE_PATH=vendor/bundle`은 젬을 프로젝트 내의 `vendor/bundle` 디렉토리에 설치하고 사용하도록 지정합니다. 이는 시스템 Ruby 환경과의 충돌을 방지합니다.
