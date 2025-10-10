pipeline {
  agent any
  
  environment {
    DC = 'docker-compose'
    BASE_COMPOSE = 'docker-compose.yml'
    PROD_COMPOSE = 'docker-compose.prod.yml'
    STG_COMPOSE = 'docker-compose.staging.yml'
    PROD_STACK = 'prod'
    STG_STACK = 'staging'
  }
  
  stages {
    stage('Build images') {
      steps {
        sh '''
          set -eux
          $DC -f ${BASE_COMPOSE} pull || true
          DOCKER_BUILDKIT=1 $DC -f ${BASE_COMPOSE} build --pull --progress=plain
        '''
      }
    }
    
    stage('Deploy by branch') {
      when { 
        anyOf { 
          branch 'main'
          branch 'develop' 
        } 
      }
      steps {
        script {
          if (env.BRANCH_NAME == 'main') {
            sh '''
              set -eux
              $DC -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} down --remove-orphans || true
              $DC -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} up -d
              $DC -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} ps
            '''
          } else {
            sh '''
              set -eux
              $DC -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} down --remove-orphans || true
              $DC -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} up -d
              $DC -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} ps
            '''
          }
        }
      }
    }
  }
}