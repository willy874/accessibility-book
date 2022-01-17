git checkout int
yard build
git add .
git commit -m "depoly: build."
git push -u origin int
git checkout dev
echo "Success"