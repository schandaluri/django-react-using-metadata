node {
  timestamps {
    node {
      stage("checkout"){
        checkout scm
        stash "source"
      }

      stage("static code"){
        sh "docker-compose -f docker-compose-tests.yml build quality"
        sh "docker-compose -f docker-compose-tests.yml run --rm quality"
      }

      stage ("unit test"){
        sh "docker-compose -f docker-compose-tests.yml build tests"
        sh "docker-compose -f docker-compose-tests.yml run --rm tests"

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
