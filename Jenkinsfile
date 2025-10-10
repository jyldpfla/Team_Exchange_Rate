def DC = 'docker compose'  // compose 플러그인 기본
try { sh "${DC} version" } catch (e) { DC = 'docker-compose'; sh "${DC} version" }

pipeline {
  agent any
  options { timestamps(); skipDefaultCheckout(false) }

  environment {
    BASE_COMPOSE = 'docker-compose.yml'
    PROD_COMPOSE = 'docker-compose.prod.yml'
    STG_COMPOSE  = 'docker-compose.staging.yml'
    PROD_STACK   = 'app-prod'
    STG_STACK    = 'app-staging'
  }

  stages {
    stage('Sanity') {
      steps {
        sh '''
          set -x
          whoami
          id
          pwd
          ls -al
          docker version
          docker compose version || docker-compose version
        '''
      }
    }

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build images') {
      steps {
        sh """
          set -euxo pipefail
          ${DC} -f ${BASE_COMPOSE} pull || true
          DOCKER_BUILDKIT=1 ${DC} -f ${BASE_COMPOSE} build --pull --progress=plain
        """
      }
    }

    stage('Deploy by branch') {
      when { anyOf { branch 'main'; branch 'develop' } }
      steps {
        script {
          if (env.BRANCH_NAME == 'main') {
            sh """
              set -eux
              ${DC} -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} down --remove-orphans || true
              ${DC} -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} up -d
              ${DC} -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} ps
            """
          } else {
            sh """
              set -eux
              ${DC} -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} down --remove-orphans || true
              ${DC} -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} up -d
              ${DC} -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} ps
            """
          }
        }
      }
    }

    stage('Build-only for feature/*') {
      when { not { anyOf { branch 'main'; branch 'develop' } } }
      steps {
        echo 'Feature branch: build only (no deploy).'
      }
    }
  }

  post {
    success {
      script {
        if (env.BRANCH_NAME == 'main')   echo "✅ PROD:    http://<OCI_PUBLIC_IP>:8005"
        if (env.BRANCH_NAME == 'develop') echo "✅ STAGING: http://<OCI_PUBLIC_IP>:8006"
      }
    }
    failure {
      echo "❌ 실패. (참고용 로그 — 실패해도 파이프라인에 영향 없도록 처리)"
      sh '''
        (docker compose -f docker-compose.yml logs --no-color | tail -n 200) || true
        (docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml logs --no-color | tail -n 200) || true
        (docker compose -p app-prod    -f docker-compose.yml -f docker-compose.prod.yml     logs --no-color | tail -n 200) || true
      '''
    }
  }
}
