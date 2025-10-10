pipeline {
  agent any

  environment {
    DC = 'docker compose'
    BASE_COMPOSE = 'docker-compose.yml'
    STG_COMPOSE = 'docker-compose.staging.yml'
    PROD_COMPOSE = 'docker-compose.prod.yml'
    STG_STACK = 'app-staging'
    PROD_STACK = 'app-prod'
  }

  stages {
    stage('Detect compose') {
      steps {
        script {
          echo "🔍 Detecting Docker Compose version..."
          sh "${DC} version"
        }
      }
    }

    stage('Sanity') {
      steps {
        sh '''
          set -eux
          whoami
          id
          pwd
          which docker
          docker version
        '''
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Build images') {
      steps {
        sh '''#!/usr/bin/env bash
        set -eux
        $DC -f ${BASE_COMPOSE} pull || true
        DOCKER_BUILDKIT=1 $DC -f ${BASE_COMPOSE} build --pull --progress=plain
        '''
      }
    }

    stage('Deploy by branch') {
      when {
        anyOf {
          branch 'develop'
          branch 'main'
        }
      }
      steps {
        script {
          if (env.BRANCH_NAME == 'develop') {
            echo "🚀 Deploying to STAGING environment..."
            sh '''#!/usr/bin/env bash
            set -eux
            $DC -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} down --remove-orphans || true
            $DC -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} up -d
            $DC -p ${STG_STACK} -f ${BASE_COMPOSE} -f ${STG_COMPOSE} ps
            '''
          } else if (env.BRANCH_NAME == 'main') {
            echo "🚀 Deploying to PRODUCTION environment..."
            sh '''#!/usr/bin/env bash
            set -eux
            $DC -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} down --remove-orphans || true
            $DC -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} up -d
            $DC -p ${PROD_STACK} -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} ps
            '''
          }
        }
      }
    }

    stage('Build-only for feature/*') {
      when {
        expression { env.BRANCH_NAME.startsWith('feature/') }
      }
      steps {
        echo "⚙️ Feature branch detected — build only, no deployment."
      }
    }
  }

  post {
    success {
      echo "✅ 성공! 배포가 완료되었습니다."
    }
    failure {
      echo "❌ 실패. 로그를 확인하세요."
      sh '''
        set +e
        ${DC} -f ${BASE_COMPOSE} logs --no-color | tail -n 200 || true
      '''
    }
  }
}
