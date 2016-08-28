#! /bin/bash

azure login
azure config mode asm
azure site create --git redis-labs-demo

# next configure your env vars
# rename the included 'env'  txt file to '.env'
# azure site appsetting add SQL_USER=<sqluser> redis-lab-demo
# and so on for each config item

# to deploy...
# git add .
# git commit -m "{your commit message}"
# git push azure master

