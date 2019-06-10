# Dockerfile for a generic server.
FROM node:12.4.0-alpine

WORKDIR /app
COPY . .
RUN rm -rf node_modules && rm -rf package-lock.json
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
  && pip install virtualenv \
  && rm -rf /var/cache/apk/*

RUN npm i

EXPOSE 3000
EXPOSE 8080

CMD npm run server