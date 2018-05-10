# loads env variable from file deploy.env
dpl ?= deploy.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

# always latest with no arguments
VERSION=latest

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
	docker build -t $(CONTAINER_NAME):$(VERSION)  .

push: ## Push image to gitlab registry
	docker tag $(CONTAINER_NAME):$(VERSION)  $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION)
	docker push $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION)

run: ## run single container
	docker run --rm -ti -p $(HOST_PORT):$(CONTAINER_PORT) --network $(DEV_NETWORK) --name $(CONTAINER_NAME) \
	-e MYSQL_HOST=$(MYSQL_HOST) -e MYSQL_DATABASE=$(MYSQL_DATABASE) -e MYSQL_PASSWORD=$(MYSQL_PASSWORD) -e MYSQL_USER=$(MYSQL_USER) \
	$(CONTAINER_NAME):$(VERSION)

stop: ## stop single container
	docker stop $(CONTAINER_NAME)

deploy: ## deploy as service in docker swarm
	docker service create -p $(HOST_PORT):$(CONTAINER_PORT) --network=$(NETWORK) --name $(CONTAINER_NAME) \
	-e MYSQL_HOST=$(MYSQL_HOST) -e MYSQL_DATABASE=$(MYSQL_DATABASE) -e MYSQL_PASSWORD=$(MYSQL_PASSWORD) -e MYSQL_USER=$(MYSQL_USER) \
	--with-registry-auth $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION)

update: ## Update service
	docker service update --with-registry-auth --image $(DOCKER_REPO)/$(CONTAINER_NAME):$(VERSION) $(CONTAINER_NAME)

lint:
	@echo 'Running lint at txt_api folder'
	npm run lint
