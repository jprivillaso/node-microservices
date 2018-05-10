FROM node:8-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

EXPOSE 80

RUN npm install

CMD ["npm", "start"]
