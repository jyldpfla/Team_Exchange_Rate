pipeline {
  agent any

  stages {

    stage('Pre-clean') {
      steps {
        echo '🧹 Cleaning up old containers & networks...'
        sh '''
          docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml down --remove-orphans || true
          docker system prune -af || true
          docker network prune -f || true
        '''
      }
    }

    stage('Build images') {
      steps {
        echo '🛠 Building Docker images...'
        sh '''
          docker compose -f docker-compose.yml pull || true
          docker compose -f docker-compose.yml build --pull
        '''
      }
    }

    stage('Deploy by branch') {
      when { branch 'develop' }
      steps {
        echo '🚀 Deploying to STAGING environment...'
        sh '''
          docker compose -p app-staging -f docker-compose.yml -f docker-compose.staging.yml up -d
        '''
      }
    }

    stage('Build-only for feature/*') {
      when { expression { env.BRANCH_NAME.startsWith('feature/') } }
      steps {
        echo '🧱 Feature branch detected — build only.'
        sh '''
          docker compose -f docker-compose.yml build --pull
        '''
      }
    }
  }

  post {
    failure {
      echo '❌ 실패. 로그를 확인하세요.'
      sh '''
        set +e
        docker compose -f docker-compose.yml logs --no-color | tail -n 200 || true
      '''
    }
    success {
      echo '✅ 성공적으로 배포되었습니다!'
    }
  }
}
