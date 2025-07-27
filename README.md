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

    서버가 시작되면 `http://127.0.0.1:4000` 또는 터미널에 표시되는 주소로 접속하여 사이트를 미리 볼 수 있습니다.

3.  **서버 종료 (매우 중요):**

    사이트 확인 후 **반드시** 서버가 실행 중인 터미널에서 `Ctrl + C`를 눌러 서버를 종료해야 합니다. 서버는 자동으로 종료되지 않으며, 여러 개의 서버 프로세스가 실행되면 시스템 리소스를 소모할 수 있습니다.

    **팁: 'Address already in use' 오류 발생 시:**
    이 오류는 이전 서버 프로세스가 아직 실행 중일 때 발생합니다. 다음 명령으로 해당 프로세스를 찾아 종료할 수 있습니다.
    1.  포트 4000번을 사용하는 프로세스 찾기:
        ```bash
        lsof -i :4000
        ```
        (출력에서 `PID`를 확인합니다.)
    2.  해당 프로세스 종료하기 (예시 PID: 1234):
        ```bash
        kill -9 1234
        ```

**참고:** `BUNDLE_PATH=vendor/bundle`은 젬을 프로젝트 내의 `vendor/bundle` 디렉토리에 설치하고 사용하도록 지정합니다. 이는 시스템 Ruby 환경과의 충돌을 방지합니다.