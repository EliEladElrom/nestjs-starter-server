/*
Author: Eli Elad Elrom
File: ecosystem.config.js

https://github.com/Unitech/pm2
 */

module.exports = {
  apps: [
    {
      name: 'aws-codedeploy-server',
      cwd: '/home/ubuntu/aws-codedeploy-server',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
