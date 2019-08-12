docker exec mythgard_express_1 /bin/sh -c "npm i"
docker exec mythgard_next_1 /bin/sh -c "npm i"
docker-compose restart express
docker-compose restart next
