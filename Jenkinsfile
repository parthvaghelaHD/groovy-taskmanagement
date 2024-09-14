pipeline {
    agent any
    environment {
        // Set the environment variable for the .env file if necessary
        ENV_PATH = './env'
        NODE_ENV = 'development'
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Pull the code from the GitHub repository
                git branch: 'feature/development', url: 'https://github.com/parthvaghelaHD/groovy-taskmanagement.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Navigate to the project directory and install the required npm packages
                echo "Navigating to project directory and installing packages"
                dir('groovy-taskmanagement') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests and Benchmark') {
            steps {
                // Navigate to the project directory and run the tests
                echo "Running the benchmark"
                dir('groovy-taskmanagement') {
                    sh 'npm run test'
                }
            }
        }

        stage('Check for PM2 process') {
            steps {
                script {
                    // Navigate to the project directory
                    dir('groovy-taskmanagement') {
                        // Check if the PM2 process named 'groovy' is running
                        def pm2List = sh(script: 'sudo pm2 list | grep groovy || true', returnStatus: true)
                        if (pm2List == 0) {
                            // If found, restart the PM2 process
                            echo "Restarting the existing PM2 app: groovy"
                            sh 'sudo pm2 restart groovy --update-env'
                        } else {
                            // If not found, start the app using npm run start with PM2
                            echo "Starting a new PM2 app: groovy using npm run start"
                            sh 'sudo pm2 start npm --name groovy -- run start'
                        }
                    }
                }
            }
        }
    }
    post {
        always {
            // Ensure that PM2 is running and the process list is displayed
            sh 'sudo pm2 list'
        }
        success {
            echo 'Deployment was successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
