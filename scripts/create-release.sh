#!/usr/bin/env bash

# This script builds and pushes images needed for a deployment to docker hub.
#
# Usage :
# 
#   scripts/create-release.sh <version> 
#
# Example
# 
#   scripts/create-release.sh v1.2.3
#
# You must be able to push to the `gsdf` org on docker hub ot run this script.

VERSION=$1

if test -z "$VERSION"
then
  echo ""
  echo "Usage:"
  echo ""
  echo "  scripts/create-release.sh <version>"
  echo ""
  echo "E.g.:"
  echo ""
  echo "  scripts/create-release.sh v1.2.3"
  echo ""
  exit
fi

echo "Create release for version $VERSION..."

docker build -t "gsdf/mg-next:$VERSION" ./next
docker build -t "gsdf/mg-server:$VERSION" ./express
docker push "gsdf/mg-next:$VERSION"
docker push "gsdf/mg-server:$VERSION"

echo "Done."
