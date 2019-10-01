#!/usr/bin/env bash

docker-compose stop db
docker-compose rm -vf db
docker-compose build --no-cache db
docker-compose stop -t 0 express
docker-compose up -d
