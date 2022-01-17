yarn build
echo "Build"
git add .
git commit -m "depoly: build."
echo "Commit"
git checkout int
git merge dev
git push origin int
git checkout dev
echo "Success"