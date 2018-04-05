FROM node:9-alpine

# Needed to Ctrl-C when using --watch
RUN apk add --no-cache tini curl
ENTRYPOINT ["/sbin/tini", "--"]

WORKDIR /app

RUN yarn global add webpack@~4 webpack-cli
RUN yarn global add typescript@~2.8 ts-loader sass-loader node-sass style-loader css-loader resolve-url-loader file-loader url-loader html-webpack-plugin extract-text-webpack-plugin@^4.0.0-beta.0 clean-webpack-plugin webpack-manifest-plugin
RUN yarn global add webpack-dev-server

# global binary apps won't run without this
ENV NODE_PATH /usr/local/share/.config/yarn/global/node_modules

CMD ["webpack", "-p"]
