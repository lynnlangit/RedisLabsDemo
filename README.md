# RedisLabSession #
### Handling Sessions with Redis Cloud ###
Demo of using RedisLabs RedisCloud as a user caching store for a node.js app with SQL Azure

NOTE: Instructions are for OSX

1. Pre-requesites
  * install node.js
  * install the npm tedious package (needed to connect to SQL Azure)
  * install azure cli
  * use a text editor (VSCode, Sublime, etc...)

2. Redis Cloud
  * go to RedisLabs.com and sign up
  * login to RedisLabs.com and click 'New Redis Subscription'
  * next to 'Cloud' click the drop down, select 'Azure/west-us' and 30MB/Free
  * go to 'My Resources' >'Manage Resources', wait for the green checkmark 
  * note your Redis Cloud endpoint address and Redis password

3. Azure Setup
  * fill in these values on the Redis variables in your 'env' file
  * fill in your desired SQL values in your 'env' file
  * rename the 'env' file to '.env'
  * update 'redis-cloud.js' line 25 to use your value for the 'secret'
  * open 'deploy-site.sh'
  * run 'deploy-site.sh' from a bash shell
  * connect to your SQLAzure instance with a client (i.e. Navicat), run scripts
    * run 'user-login.sql' and 'user-status.sql' to create tables

4. Test the results
  * test with localhost
  * get your ip address and set a firewall rule in azure to test remotely
  * push your code to azure using the following commands
	  * git add .
	  * git commit - '{your commit message}'
	  * git push azure master
  * test via your azure website endpoint (using a browser)
