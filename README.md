# RedisLabSession #
### Handling Sessions with Redis Cloud ###
Demo of using RedisLabs RedisCloud as a user caching store for a node.js app with Azure SQL

NOTE: Instructions are for OSX

1. Prerequisites
  * install node.js
  * install azure cli
  * use a text editor (VSCode, Sublime, etc...)

2. Redis Cloud
  * go to RedisLabs.com and sign up
  * login to RedisLabs.com and click 'New Redis Subscription'
  * next to 'Cloud' click the drop down, select 'Azure/west-us' and 30MB/Free
  * go to 'My Resources' >'Manage Resources', wait for the green checkmark 
  * note your Redis Cloud endpoint address and Redis password
  * fill in these values on the Redis variables in your 'env' file
  
3. Azure Setup
  * fill in your desired values in your 'azure-scripts/redis-lab-demo-sql-server/parameters.json' file
  * open 'azure-scripts/redis-lab-demo-sql-server/deploy.sh'
  * run 'azure-scripts/redis-lab-demo-sql-server/deploy.sh' from a bash shell
  * connect to your Azure SQL instance with a client (i.e. Navicat), run scripts
    * run 'user-login.sql' and 'user-status.sql' to create tables
  * fill in your SQL values in your 'env' file

4. Test the results
  * update 'redis-cloud.js' line 25 to use your value for the 'secret'
  * rename the 'env' file to '.env'
  * run npm install 
  * test with localhost
  * get your ip address and set a firewall rule in azure to test remotely
  * run the commands in 'azure-scripts/deploy-site.sh'
  * push your code to azure using the following commands
	  * git add .
	  * git commit - '{your commit message}'
	  * git push azure master
  * test via your azure website endpoint (using a browser)
