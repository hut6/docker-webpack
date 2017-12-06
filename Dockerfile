FROM node:9-alpine

RUN npm install -g webpack webpack-dev-server typescript ts-loader

WORKDIR /app

# Needed to Ctrl-C when using --watch
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Test
COPY test /test
RUN cd /test && webpack

CMD ["webpack"]
