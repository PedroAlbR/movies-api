start:
	make build && docker-compose up

stop:
	docker-compose stop

clean:
	docker-compose down -v

build:
	docker-compose build

help:
	@echo "build: Builds the containers, does not start them."
	@echo "clean: Removes all containers and postgres/redis/elastic data."
	@echo " help: Displays this menu."
	@echo "start: Builds and starts all containers."
	@echo " stop: Stops all containers, preserving data."

default: start
