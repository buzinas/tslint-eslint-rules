#!/usr/bin/env bash

npm update

VERSION=$(node --eval "console.log(require('./package.json').version);")

npm test || exit 1

echo "Ready to publish TSLint-ESLint-Rules version $VERSION."
echo "Has the version number been bumped? CHANGELOG.md?"
read -n1 -r -p "Press Ctrl+C to cancel, or any other key to continue." key

echo "Creating git tag v$VERSION..."

git tag v$VERSION
git push --tags

echo "Uploading to NPM..."

npm publish

echo "All done."
