#!/bin/bash

if [[ -d node_modules ]]
then
  echo "Cached dependecies exist, bypassing install"
else
  echo "No NPM modules, doing a clean install"
  npm ci
fi
