FROM node:8-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

HEALTHCHECK --interval=30s --timeout=5s --retries=2 --start-period=10s \
  CMD curl -f http://localhost/_dockerhealth || exit 1

RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

EXPOSE 80

RUN npm install

CMD ["npm", "start"]
