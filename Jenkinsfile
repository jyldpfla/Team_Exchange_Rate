pipeline {
  agent any
  options { timestamps(); skipDefaultCheckout(false) }

  environment {
    BASE_COMPOSE = 'docker-compose.yml'
    PROD_COMPOSE = 'docker-compose.prod.yml'
    STG_COMPOSE  = 'docker-compose.staging.yml'
    PROD_STACK   = 'app-prod'     // compose 프로젝트 이름(-p)
    STG_STACK    = 'app-staging'
  }

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Build images') {
      steps {
        sh """
          # 공통 빌드(캐시 활용)
          docker compose -f ${BASE_COMPOSE} pull || true
          docker compose -f ${BASE_COMPOSE} build --pull
        """
      }
    }

    stage('Deploy by branch') {
      when { anyOf { branch 'main'; branch 'develop' } }  // main, develop만 배포
      steps {
        script {
          if (env.BRANCH_NAME == 'main') {
            // 운영 배포
            sh """
              docker compose -p ${PROD_STACK} \
                -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} \
                down --remove-orphans || true

              docker compose -p ${PROD_STACK} \
                -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} \
                up -d

              docker compose -p ${PROD_STACK} \
                -f ${BASE_COMPOSE} -f ${PROD_COMPOSE} ps
            """
          } else if (env.BRANCH_NAME == 'develop') {
            // 스테이징 배포
            sh """
              docker compose -p ${STG_STACK} \
                -f ${BASE_COMPOSE} -f ${STG_COMPOSE} \
                down --remove-orphans || true

              docker compose -p ${STG_STACK} \
                -f ${BASE_COMPOSE} -f ${STG_COMPOSE} \
                up -d

              docker compose -p ${STG_STACK} \
                -f ${BASE_COMPOSE} -f ${STG_COMPOSE} ps
            """
          }
        }
      }
    }

    stage('Build-only for feature/*') {
      when { not { anyOf { branch 'main'; branch 'develop' } } } // feature/* 등
      steps {
        echo "Feature 브랜치: 배포 없이 빌드만 수행"
        // 필요하면 단위테스트/정적분석 추가
      }
    }
  }

  post {
    success {
      script {
        if (env.BRANCH_NAME == 'main') {
          echo "✅ PROD: http://<OCI_PUBLIC_IP>:8005"
        } else if (env.BRANCH_NAME == 'develop') {
          echo "✅ STAGING: http://<OCI_PUBLIC_IP>:8006"
        }
      }
    }
    failure {
      echo "❌ 실패. 아래 로그 일부 표시"
      sh 'docker compose -f docker-compose.yml logs --no-color | tail -n 200 || true'
    }
  }
}
