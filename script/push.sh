yarn lint
git commit -am "test" 
git push origin dev
git checkout int
git merge dev
git push origin int
git checkout master
git merge dev
git checkout dev