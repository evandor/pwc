rm -rf node_modules/ .tmp/ plugins/ platforms/ www/

mkdir www

npm install
cordova platform add ios

ionic build 
#ionic cordova build ios

