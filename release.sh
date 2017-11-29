#!/bin/sh

cd "$(dirname $0)"

npm run release
git push --follow-tags origin master
npm publish
bash demo/gh-publish.sh
