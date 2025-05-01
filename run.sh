#!bin/bash
# sudo rm -rf ./data
docker-compose down
docker-compose build
docker-compose up -d
docker-compose logs -f