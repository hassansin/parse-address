#!/usr/bin/env bash

if [ -z $1 ]
then
  printf '\n\n\nError: no semver version type argument provided. WILL NOT publish\n\n'
  printf 'Accepted semver version types are: "major", "minor", "patch", "none"\n\n'
  printf 'To fix this error, please re-run and pass a version type argument: i.e. "npm run publish-package none"\n\n\n'
  exit
fi

rm -rf dist
mkdir dist
cp -R src dist/src
npm run build

if [ $1 != 'none' ]
then
  printf '\n\n\n\nBUMPING VERSION\n\n\n\n'
  npm --no-git-tag-version version $1
else
  printf '\n\n\n\nNO VERSION BUMP\n\n\n\n'
fi

npm publish
