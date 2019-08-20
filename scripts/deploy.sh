#!/usr/bin/env bash

# This script builds and pushes images needed for a deployment to docker hub.
#
# Usage :
# 
#   scripts/deploy.sh <version> 
#
# Example
# 
#   scripts/deploy.sh v1.2.3
#
# You must have kubectl configured to work with a k8s cluster to run this
# script.

VERSION=$1

if test -z "$VERSION"
then
  echo ""
  echo "Usage:"
  echo ""
  echo "  scripts/deploy.sh <version>"
  echo ""
  echo "E.g.:"
  echo ""
  echo "  scripts/deploy.sh v1.2.3"
  echo ""
  exit
fi

echo "Deploying version $VERSION"

source kube-config/secrets.sh

sed s/\$VERSION/"$VERSION"/ kube-config/manifest.yml | kubectl apply -f -
