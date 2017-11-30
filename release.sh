#!/bin/sh

cd "$(dirname $0)"

npm run release
git push --follow-tags origin master
npm publish
node ./node_modules/publish-github-pages/bin/gh-pages.js publish
