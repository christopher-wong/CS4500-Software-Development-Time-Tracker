class Globals {
    static String stagingIP="34.239.24.224"
    static String prodIP=""
    static String baseSSHcommand = "ssh -o StrictHostKeyChecking=no ubuntu@"
}

// def notifyBuild(String buildStatus='STARTED') {

//     // build status of null means successful
//     buildStatus = buildStatus ?: 'SUCCESSFUL'

//     if (buildStatus == 'STARTED') {
//         message = 'Build Started: '
//         color = 'warning'
//     }
//     else if (buildStatus == 'SUCCESSFUL') {
//         message = 'Build Successful: '
//         color = 'good'
//     }
//     else {
//         message = 'Build Failed: '
//         color = 'danger'
//     }

//     // token: xoxp-246586509008-247245743058-272843278258-07aa864f6643603344f52b153765c3a2

//     withCredentials([[$class: 'StringBinding', credentialsId: 'team102_slack_token', variable: 'mytoken']])
//     {
//         // Sending slack Notification
//         slackSend(message: message + env.JOB_NAME + '-' + env.BUILD_NUMBER + " (<${env.BUILD_URL}| link>)", teamDomain: 'cs4500-f17', token: env.mytoken, channel: '#team102-bots', color: color)
//     }
// }

node {
    try {
        // // send the initial Slack notification that the build has started
        // notifyBuild('STARTED')

        // clean the directory, and then checkout
        stage('Clean and Checkout')
        {
            echo 'Cleaning directory...'
            deleteDir()
            echo 'Done clean!'

            echo 'Starting checkout...'
            checkout scm
            echo 'Done checkout!'
        }

        // install all node_module dependencies
        stage('Setup')
        {
            echo 'Installing dependencies'
            sh 'yarn'
            echo 'Dependencies installed!'
        }

        // let's check for syntax errors early and just fail if this breaks.
        stage('Lint')
        {
            echo 'Linting...'
            sh 'yarn run lint'
            echo 'Done lint!'
        }

        // run any tests that don't require the database
        stage('Unit Tests')
        {
            echo 'Running unit tests...'
            sh 'yarn test:unit'
            echo 'Done unit tests!'
        }

        // log into remote server, checkout latest code, install deps, then run all tests (db included)
        stage('Integration Tests')
        {
            echo 'Running integration tests...'
            baseSSHcommand = "ssh -o StrictHostKeyChecking=no ubuntu@"

            if(env.BRANCH_NAME == "staging") {
                sshagent(credentials: ['ssh-staging-2']) {
                    sh "${Globals.baseSSHcommand}${Globals.stagingIP} 'cd 102; git pull'"
                    sh "${Globals.baseSSHcommand}${Globals.stagingIP} 'cd 102; git checkout ${env.BRANCH_NAME}'"
                    sh "${Globals.baseSSHcommand}${Globals.stagingIP} 'cd 102; yarn install'"
                    sh "${Globals.baseSSHcommand}${Globals.stagingIP} 'cd 102; yarn test'"
              }
            }

            echo 'Done integration tests!'
        }

        // we'll deploy one at a time. login to remote, start the thing
        lock(inversePrecedence: false, resource: 'run-serial')
        {
           stage('Build and Deploy')
           {
               echo 'Beginning deploy...'

               if(env.BRANCH_NAME == "staging") {
                    sshagent(credentials: ['ssh-staging-2']) {
                        sh "${Globals.baseSSHcommand}${Globals.stagingIP} 'cd 102; npm run build'"
                        sh "${Globals.baseSSHcommand}${Globals.stagingIP} 'cd 102; pm2 restart ecosystem.config.js --env staging'"
                  }
               }

               echo 'Deploying complete!'
           }
        }
    }

    catch(e) {
        // currentBuild.result = "FAILED"
        throw e
    }
    finally {
        // notifyBuild(currentBuild.result)
    }
}
