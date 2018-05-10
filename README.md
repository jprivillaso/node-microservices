# node-microservices (work in progress)

The idea of this example is to illustrate how to create a microservices architecture in Nodejs.
For that purpose, we are going to simulate an orders delivery system that has three microservices:

1. Frontend service
  Will display a table with all the orders and its status.
2. Consumer service
  Will ask to the `delivery_service` to retrieve the next delivery to be processed. It's important to mention that we want to simulate a lot of consumers asking to a single `delivery_service` for orders, that's why this service will be scaled using docker swarm.
3. Delivery service
  Will retrieve the next delivery to the `consumer_service`.


## Run it locally

1. In your terminal, go to the root of the project
2. Execute in a unix terminal `make build`
3. Execute in a unix terminal `make run`

That will build and run the containers locally so you can access and test them.