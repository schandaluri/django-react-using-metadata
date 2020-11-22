#!/usr/bin/env bash

function wait_for {
    while ! $(nc -z $1 $2); do
        log_message "Waiting for $1:$2";
        sleep 2;
    done
}

function wait_for_migrations {
    while ! $(./manage.py migrations_completed > /dev/null); do
      log_message 'Waiting for migrations to finish';
      sleep 5;
    done
}

case "$1" in
  'tests')
#    wait_for mariadb-test 3306
    pytest --junitxml=/test-reports/results.xml \
           --cov-report xml:/coverage-reports/coverage.xml \
           --cov-report html:/coverage-reports/index.html \
           --cov=. --cov-config .coveragerc
  ;;
  'web')
    python manage.py runserver
    gunicorn my_apis.wsgi --bind 0.0.0.0:8000 --workers 4 --access-logfile '-'
  ;;
  'quality')
    pre-commit run --all-files
  ;;
  'bash')
    bash
  ;;
  *)
    ./manage.py $@
  ;;
esac
