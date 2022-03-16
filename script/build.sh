echo Deployment
git pull origin int
# yarn install
# git restore yarn.lock
# if [ ! -f ".env" ]; then
# cat > .env << EOF
#   VUE_APP_LIFF_ID= 
#   VUE_APP_LIFF_HOST= 
#   VUE_APP_API_URL= 
#   VUE_APP_CLIENT_ID= 
# EOF
# echo 'Create ENV, Please fill out ".env".'
# else
# yarn build
# fi
yarn build
yarn serve
