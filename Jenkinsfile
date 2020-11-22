node {
  timestamps {
    node {
      stage("checkout"){
        checkout scm
        stash "source"
      }

      stage("static code"){
        // sh "pre-commit run --all-files"
        sh "docker-compose -f docker-compose-tests.yml build quality"
        sh "docker-compose -f docker-compose-tests.yml run --rm quality"
      }

      stage ("unit test"){
        sh "docker-compose -f docker-compose-tests.yml build tests"
        sh "TEST_VOLUME=${env.WORKSPACE}/test-reports \
            COVERAGE_VOLUME=${env.WORKSPACE}/coverage-reports \
            docker-compose -f docker-compose-tests.yml run --rm tests"

        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: true,
          keepAll: true,
          reportDir: 'coverage-reports',
          reportFiles: 'index.html',
          reportName: 'Coverage report'
        ])
      }

      stage("cleanup"){
        cleanWs notFailBuild: true
      }
    }
  }
}
