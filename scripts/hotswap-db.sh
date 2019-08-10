#!/usr/bin/env bash

CONAINER_ID=$(docker ps -aqf "ancestor=mg-postgres")
PGDATABASE=$(grep PGDATABASE .env | cut -d '=' -f 2-)
PGUSER=$(grep PGUSER .env | cut -d '=' -f 2-)
PGPASSWORD=$(grep PGPASSWORD .env | cut -d '=' -f 2-)
echo "PGPASSWORD=$PGPASSWORD psql -U $PGUSER -d $PGDATABASE -a -f /docker-entrypoint-initdb.d/init.sql" | docker exec -i "$CONAINER_ID" /bin/bash
