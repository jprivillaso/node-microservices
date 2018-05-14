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

prepare_tests_environment:
	mysql -h $(MYSQL_HOST) -u root --port=$(TEST_DB_PORT) -p$(MYSQL_ROOT_PASSWORD) \
	-e 'drop database if exists $(TEST_DB); create database $(TEST_DB)'
	mysql -h $(MYSQL_HOST) -u root --port=$(TEST_DB_PORT) -p$(MYSQL_ROOT_PASSWORD) \
	--database=$(TEST_DB) < test/init-test-environment.sql
	docker run --rm -ti -d -p $(TEST_HOST_PORT):$(CONTAINER_PORT) --network $(NETWORK) \
	--name $(TEST_CONTAINER_NAME) -e MYSQL_HOST=$(MYSQL_HOST) -e MYSQL_PORT=$(TEST_DB_PORT) \
	-e MYSQL_DATABASE=$(MYSQL_DATABASE) -e MYSQL_PASSWORD=$(MYSQL_ROOT_PASSWORD) -e MYSQL_USER=$(MYSQL_USER) \
	$(CONTAINER_NAME):$(VERSION)

make run_tests:
	npm run test

test:
	make prepare_tests_environment
	make run_tests

run: ## run single container
	docker run --rm -ti -d -p $(HOST_PORT):$(CONTAINER_PORT) --network $(NETWORK) --name $(CONTAINER_NAME) \
	-e MYSQL_HOST=$(MYSQL_HOST) -e MYSQL_PORT=$(MYSQL_PORT) -e MYSQL_DATABASE=$(MYSQL_DATABASE) \
	-e MYSQL_PASSWORD=$(MYSQL_PASSWORD) -e MYSQL_USER=$(MYSQL_USER) \
	$(CONTAINER_NAME):$(VERSION)

run_from_registry: ## run single container
	docker run -d -p $(HOST_PORT):$(CONTAINER_PORT) --network $(NETWORK) --name $(CONTAINER_NAME) \
	-e MYSQL_HOST=$(MYSQL_HOST) -e MYSQL_PORT=$(MYSQL_PORT) -e MYSQL_DATABASE=$(MYSQL_DATABASE) -e MYSQL_PASSWORD=$(MYSQL_PASSWORD) -e MYSQL_USER=$(MYSQL_USER) \
	$(REGISTRY_URL)

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

create_db:
	docker run --name $(MYSQL_HOST) --net $(NETWORK) -p $(MYSQL_PORT):3306 -e MYSQL_ROOT_PASSWORD=password -d mysql
fill_db:
	mysql -h 127.0.0.1 -u root --port=$(MYSQL_PORT) -p$(MYSQL_ROOT_PASSWORD)  -e 'drop database if exists deliverydb; create database deliverydb;'
	mysql -h 127.0.0.1 -u root --port=$(MYSQL_PORT) -p$(MYSQL_ROOT_PASSWORD) --database=deliverydb < sql/init.sql
	sleep 2

