#!/bin/sh
docker swarm init
docker stack deploy -c compose.yml dctest
