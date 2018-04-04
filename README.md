# Webpack on Docker

Currently includes:

- webpack 4
- TypeScript 2.8
- SASS

## Usage

You need to define a `webpack.config.js` per project. This repository has a sample.

Standard build step (defaults to production)

    docker run -v $(pwd):/app hut6/webpack

Use `--watch` to automatically update build

    docker run -v $(pwd):/app hut6/webpack webpack --watch --mode development

Use `webpack-dev-server` to do automatic rebuilds and live reload

    docker run -v $(pwd):/app hut6/webpack webpack-dev-server --watch --mode development

## Examples

The `test` directory contains an example layout and a `composer.json` file which is a good
starting point for a new project.

 - `composer build` to run a standard production build (add `--mode development`)
 - `composer watch` to automatically update changed assets
 - `composer dev-server` to run webpack-dev-server and define a manifest.json usable by Symfony
 - `composer yarn` to install Node dependencies
