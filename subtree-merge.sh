#!/bin/bash

# I don't believe I'll need this long-term, but it's going to exist here
#   for now.
# The reason it exists is to merge all my individual repos into one monorepo
#   while still maintaining the history of each package.

echo "Adding $1 to node-packages under packages/$1."

git remote add -f packages/$1 https://github.com/MatthewSH/$1.git
git merge -s ours --no-commit --allow-unrelated-histories packages/$1/master
git read-tree --prefix=packages/$1 -u packages/$1/master
git commit -m "$1 subtree merge."
git remote remove packages/$1

echo "$1 added and remote moved. Remember to push."