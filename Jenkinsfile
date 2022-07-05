pipeline {
    agent any

    environment {
        AWS_ACCESS_KEY = credentials('aws-creds-sl')
        AWS_DEFAULT_REGION = 'ap-southeast-2'
        IMAGE_REPO_NAME = 'backend-dockerimage-repo'
        GIT_HASH = GIT_COMMIT.take(7)
        IMAGE_TAG = "$BUILD_NUMBER" + '-' + "$GIT_HASH" + '-' + "$BUILD_TIMESTAMP"
        exec_role_arn = 'arn:aws:iam::497551902879:role/ecsTaskExecutionRole'
        AWS_ECS_TASKDEF_NAME = 'CCS-F-UAT-task'
        task_def_arn = 'arn:aws:ecs:ap-southeast-2:497551902879:task-definition/CCS-F-UAT-task'
        AWS_ECS_CLUSTER = 'CCS-F-UAT-cluster'
        AWS_ECS_SERVICE = 'CCS-F-UAT-service'
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

    stages {
        stage('Clone Source code from Github') {
            steps {
                checkout scm
            }
        }

        stage('Static Code Analysis') {
            steps {
                echo 'Running Code Analysis...'
            }
        }

        stage('Testing') {
            steps {
                echo 'Running Unit Tests...'
            }
        }

        stage('Build Image') {
            steps {
                echo 'Building docker image...'
                sh 'docker build -t ${IMAGE_REPO_NAME}:${IMAGE_TAG} .'
            }
        }
        stage('Push to ECR') {
            when {
                branch 'feature/cc-0085-update-migration'
            }
            steps {
                echo 'Logging into ECR...'
                sh 'aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com'

                echo 'Pushing docker image to ECR...'
                sh 'docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}'
                sh 'docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Deploy to UAT Environment') {
            when {
                branch 'feature/cc-0085-update-migration'
            }
            steps {
                // AWS CLI must be installed in the Jenkins server first.
                // Below is used to upgrade/replace the existing service, which may be created manually or through terraform.
                echo "=========== Update ECS cluster's service ================="
                // Override image field in taskdef file
                sh "sed -i 's|{{image}}|${REPOSITORY_URI}:${IMAGE_TAG}|' taskdef.json"
                // Create a new task definition revision
                sh "aws ecs register-task-definition --execution-role-arn ${exec_role_arn} --cli-input-json file://taskdef.json --region ${AWS_DEFAULT_REGION}"
                // Update service on Fargate
                sh "aws ecs update-service --cluster ${AWS_ECS_CLUSTER} --service ${AWS_ECS_SERVICE} --task-definition ${task_def_arn} --region ${AWS_DEFAULT_REGION}"
            }

            post {
                success {
                    echo 'Deploy to ECS successfully!'
                }
                failure {
                    echo 'The deploy stage failed.'
                    echo 'Roll back to last deployment.'
                }
            }
        }

        stage('Clear Up Docker Image') {
            steps {
                script { 
                    echo 'Clear Up Docker Image...'
                    def imageId = sh( 
                                        script: 'docker images -qf reference=\${IMAGE_REPO_NAME}:\${IMAGE_TAG}',
                                        returnStdout: true
                                    )

                    echo "Image Name: ${IMAGE_REPO_NAME}:${IMAGE_TAG}"
                    echo "imageId: ${imageId}"

                    if ("${imageId}" != '') {
                        echo "Deleting image id: ${imageId}..."
                        sh "docker rmi -f ${imageId}"
                    } else {
                        echo "No image to delete..."
                    }
                }
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
