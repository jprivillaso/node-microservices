# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

STACK=docker-compose.yml

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

# DOCKER TASKS

# Build the container
build: build_frontend_service build_delivery_service build_consumers_service

build_frontend_service: ### build frontend_service
	$(MAKE) -C frontend_service -B build

build_delivery_service: ## build delivery_service
	$(MAKE) -C delivery_service -B build

build_consumer_service: ## build consumer_service
	$(MAKE) -C consumers_service -B build

push: ## Push all images
	$(MAKE) -C frontend_service push
	$(MAKE) -C delivery_service push
	$(MAKE) -C consumers_service push

stack-deploy: ## Initialize the swarm
	docker stack deploy -c $(STACK) delivery_app

stack-remove: ## Leave the swarm
	docker stack rm delivery_app

lint: ## Lint all folders
	$(MAKE) -C bridge_sync lint
	$(MAKE) -C txt_api lint
	$(MAKE) -C frontend lint