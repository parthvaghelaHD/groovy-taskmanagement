pipeline {
    agent any

     environment {
        NODE_HOME = '/usr/local/bin/node'
        PATH = "${NODE_HOME}:${PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'feature/development', url: 'https://github.com/parthvaghelaHD/groovy-taskmanagement.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir('/home/ubuntu/groovy/groovy-taskmanagement/') { 
                    script {
                        sh 'npm install'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                // Deploy the application using PM2
                dir('/home/ubuntu/groovy/groovy-taskmanagement/') {
                    script {
                        sh 'pm2 stop groovy || true'
                        sh 'pm2 start src/index.js --name groovy'
                        sh 'pm2 save'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed. Please check the logs for details.'
        }
        always {
            cleanWs()
        }
    }
}
