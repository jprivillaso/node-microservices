# loads env variable from file deploy.env
dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

# always latest with no arguments
VERSION=latest

.PHONY: all test clean build push run cirun stop release deploy update

# HELP
# This will output the help for each task
# thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)
	@echo ''
	@echo 'make build # will use $(VERSION) as tag'
	@echo 'make build VERSION=$$(jq -rM '.version' package.json) # will use :latest as tag'

.DEFAULT_GOAL := help

build: ## Build the container
	docker network create dev_network | true
	npm run build
	docker build -t $(CONTAINER_NAME):$(VERSION) .

push: ## Push image to gitlab registry
	docker tag $(CONTAINER_NAME):$(VERSION) $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION)
	docker push $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION)

run: ## run single container
	docker run --rm -ti -d -p $(HOST_PORT):$(CONTAINER_PORT) --name $(CONTAINER_NAME) \
	$(CONTAINER_NAME):$(VERSION)
	@echo 'App listening at http://localhost:$(HOST_PORT)'

run_from_registry: ## run single container
	docker run -d -p $(HOST_PORT):$(CONTAINER_PORT) --network $(NETWORK) --name $(CONTAINER_NAME) $(REGISTRY_URL)
	@echo 'App listening at http://localhost:$(HOST_PORT)'

stop: ## stop single container
	docker stop $(CONTAINER_NAME)

deploy: ## deploy service
	docker service create -p $(HOST_PORT):$(CONTAINER_PORT) --network=$(NETWORK) --name $(CONTAINER_NAME) --with-registry-auth $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION)

update: ## Update service
	docker service update --with-registry-auth --image $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION) $(CONTAINER_NAME)

lint:
	@echo 'Running lint at frontend folder'
	npm run lint