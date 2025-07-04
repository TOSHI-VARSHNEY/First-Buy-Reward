pipeline {
    agent any

    environment {
        REPO_URL = 'git@github.com:your-repo/react-app.git'
        BRANCH = 'master'
        EC2_USER = 'ubuntu' // Change if using different user
        EC2_HOST = 'your-ec2-ip' // AWS EC2 public IP
        DEPLOY_DIR = '/var/www/react-app' // Target directory on EC2
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: "${BRANCH}", credentialsId: 'github-ssh-key', url: "${REPO_URL}"
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                script {
                    sshagent(['ec2-ssh-key']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << EOF
                                rm -rf ${DEPLOY_DIR}/build
                            EOF
                            scp -r build ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}
                        """
                    }
                }
            }
        }

        stage('Restart Server') {
            steps {
                script {
                    sshagent(['ec2-ssh-key']) {
                        sh "ssh ${EC2_USER}@${EC2_HOST} 'sudo systemctl restart nginx'"
                    }
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
