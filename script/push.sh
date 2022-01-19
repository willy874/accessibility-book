yarn lint
yarn build
git add .
dateNow=$(date +'%Y/%m/%d %H:%M:%S')
git commit -m "build: ${dateNow}."
git push origin dev
git checkout int
git merge dev
git push origin int
git checkout dev