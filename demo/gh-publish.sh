#!/bin/sh

cd "$(dirname $0)"

pagesFolder="gh-pages"
gitRepository="https://github.com/torbenm/ng2-currency.git"

if [ ! -d "./$pagesFolder" ]
then
    echo "Directory does not exist, creating it"
    mkdir "$pagesFolder"
    cd "./$pagesFolder"
    git init
    git remote add origin "$gitRepository"
    cd ..
fi
cd "./$pagesFolder"
git fetch
git checkout gh-pages --force
echo "Cleaning up directory"
rm -r ./*
echo "Creating github page content"
npm run demo:prod
git add .
git commit -m "Release $(git describe origin/master --tags)"
git push