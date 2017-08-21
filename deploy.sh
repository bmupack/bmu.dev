# git co dev
# rm -rf ./build
# npm install
# gulp --gulpfile gulpfile.deploy.js
# rm -rf ../build_temporary
# cp -R build ../build_temporary
# git co master
# mv ./* ../.temp
# rm -rf ../.temp
# cp -R ../build_temporary/* ./
# git add -A
# git ci -am 'Deploy'
# git push
# git co dev
# rm -rf favicon
# rm -rf vendor
