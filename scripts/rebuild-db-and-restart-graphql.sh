docker-compose stop db
docker-compose rm -vf db
docker-compose build --no-cache db
docker-compose stop express
docker-compose up -d
