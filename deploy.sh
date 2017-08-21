# npm install
rm -rf build/*
gulp --gulpfile gulpfile.deploy.js

cd build
git add -A
git st
git ci -am 'Deploy'
git push
cd ..
