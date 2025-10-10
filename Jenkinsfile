pipeline {
  agent any
  options { timestamps(); skipDefaultCheckout(false) }

  environment {
    BASE_COMPOSE = 'docker-compose.yml'
    PROD_COMPOSE = 'docker-compose.prod.yml'
    STG_COMPOSE  = 'docker-compose.staging.yml'
    PROD_STACK   = 'app-prod'
    STG_STACK    = 'app-staging'
    DC = ''    // 여기 채움
  }

  stages {
    stage('Detect compose') {
      steps {
        script {
          // docker compose 먼저 탐지
          def rc1 = sh(returnStatus: true, script: 'docker compose version >/dev/null 2>&1')
          if (rc1 == 0) {
            env.DC = 'docker compose'
          } else {
            def rc2 = sh(returnStatus: true, script: 'docker-compose version >/dev/null 2>&1')
            if (rc2 == 0) {
              env.DC = 'docker-compose'
            } else {
              error('Neither "docker compose" nor "docker-compose" is available in PATH')
            }
          }
          echo "Using: ${env.DC}"
          sh "${env.DC} version"
        }
      }
    }

    stage('Sanity') {
      steps {
        sh '''
          set -x
          whoami
          id
          pwd
          which docker || true
          docker version
        '''
      }
    }

    stage('Checkout') { steps { checkout scm } }

    stage('Build images') {
      steps {
        // ✅ 여기서부터는 $DC 로 사용 (쉘이 확장)
        sh '''
          set -euxo pipefail
          $DC -f ${BASE_COMPOSE} pull || true
          DOCKER_BUILDKIT=1 $DC -f ${BASE_COMPOSE} build --pull --progress=plain
        '''
      }
    }

    stage('Deploy by branch') {
      when { anyOf { branch 'main'; branch 'develop' } }
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

    stage('Build-only for feature/*') {
      when { not { anyOf { branch 'main'; branch 'develop' } } }
      steps { echo 'Feature branch: build only (no deploy).' }
    }
  }

  post {
    success {
      script {
        if (env.BRANCH_NAME == 'main')    echo "✅ PROD:    http://<OCI_PUBLIC_IP>:8005"
        if (env.BRANCH_NAME == 'develop') echo "✅ STAGING: http://<OCI_PUBLIC_IP>:8006"
      }
    }
    failure {
      echo "❌ 실패. (참고 로그)"
      sh '''
        (docker compose -f docker-compose.yml logs --no-color | tail -n 200) || true
        (docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml logs --no-color | tail -n 200) || true
        (docker compose -p app-prod    -f docker-compose.yml -f docker-compose.prod.yml     logs --no-color | tail -n 200) || true
      '''
    }
  }
}
