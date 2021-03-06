# Nodejs Microservices
<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRSI9xxOmk-g4VqA6r15ur77IfFQ_CeKjheSvsBRmNPI80RCxm" style="float:left">
</p>

It is very common to have doubts about how should we architect an application that needs to be scaled.
These questions appear and I find very complicated to find resources that can exemplify that in an easy way.

This project is intended to be a boilerplate or a microservices hello world for those who are not very familiar with devops
and with deploying and scaling applications.

For that purpose, this project simulates a delivery system that has three microservices:

1. Frontend service
  Will display a table with all the orders and its status.
2. Consumer service
  Will ask to the `delivery_service` to retrieve the next delivery to be processed. It's important to mention that we want to simulate a lot of consumers asking to a single `delivery_service` for orders, that's why this service will be scaled in a docker swarm.
3. Delivery service
  Will retrieve the next delivery to the `consumer_service`.

## Run it locally

1. In your terminal, go to the root of the project
2. Execute in a unix terminal `make build`
3. Execute in a unix terminal `make run`

That will build and run the containers locally so you can access and run them.

## Running and Scaling the app (WIP)

In order to run and scale the application, run the following commands:

1.