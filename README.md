# node-microservices (work in progress)
This example contains 3 microservices:

1. Frontend service
2. Consumer service
3. Delivery service

The idea is to simulate a delivery system that has to process multiple delivery orders.
For that purpose, the delivery service will be in charge of deliver a single order at a time and there will be n consumers asking for new orders.
That means that the consumer service will be scaled inside a docker swarm.
The frontend will list a table with all the orders and their status.
