FROM node:8.9.4-alpine as builder
WORKDIR /opt/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install --no-progress
COPY ./ .
RUN yarn run build --release

FROM node:8.9.4-stretch
MAINTAINER Harry Lee

USER root

# Install the latest Docker CE binaries
RUN apt-get update && apt-get -y install \
      apt-transport-https \
      ca-certificates \
      curl \
      gnupg2 \
      software-properties-common

RUN curl -sSL https://get.docker.com/ | sh

RUN usermod -aG docker node

# Set a working directory
WORKDIR /home/node

# Copy application files
COPY --from=builder /opt/app/build/ ./
RUN chown -R node:node ./

USER node
RUN yarn install

CMD [ "node", "server.js" ]
