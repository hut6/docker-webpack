FROM node:9-alpine

RUN yarn global add webpack webpack-dev-server typescript ts-loader sass-loader node-sass extract-text-webpack-plugin css-loader style-loader
ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules

WORKDIR /app

# Needed to Ctrl-C when using --watch
RUN apk add --no-cache tini
ENTRYPOINT ["/sbin/tini", "--"]

# Test
COPY test /test
RUN cd /test && webpack

CMD ["webpack"]
