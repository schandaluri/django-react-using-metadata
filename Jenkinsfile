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
      }

      stage("cleanup"){
        cleanWs notFailBuild: true
      }
    }
  }
}
