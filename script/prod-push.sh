git checkout int
git merge dev
git add .
git commit -m "depoly: build."
git push -u origin int
git checkout dev
echo "Success"