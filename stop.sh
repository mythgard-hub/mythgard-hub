#!/bin/sh
docker stack rm dctest
docker swarm leave --force
