# Embedr

This application provides the frontend for the Embedr website. Embedr is a project by [Kennisland](http://www.kz.nl) to allow easy searching and embedding of high quality cultural heritage images.

## Project setup

The Embedr project consists of three parts:

* A search UI implemented in React for the Embedr website and the Hawk viewer.
* A Wordpress theme that is used for the Embedr website.
* A proxy to allow JavaScript searches on the project's cloudsearch

### React UI

The biggest part of the project is the UI for the search and results pages of the Embedr website. This is located in the `src` directory. It contains the images, stylesheets and scripts that make up the application. It can be built using the Grunt tasks. The UI is implemented using React.

### Wordpress theme

The Embedr site has a custom Wordpress theme that is used to show the search and results UI. There are custom pages for the viewer and results that load the appropriate React components for the pages. The `functions.php` file makes these pages available.

It can be placed in the `wp-conten/themes` directory of a Wordpress site to get it running. It expects a few content pages to be available in the top level menu.

The theme does not contain the CSS or JavaScript to run the Embedr app, these are built from the React UI as described below.

### The proxy

The proxy is a tiny php app that allows AJAX searches on the configured Cloudsearch server. It expect a `config.php` which sets the Cloudsearch server.

## Tests

There are a few tests available for some of the React components. The tests can be run with:

`grunt test`

Tests are run by Mocha with the Chai assertion library.

## Building

There are a few steps to the build:

1. The Wordpress theme is copied into the `build/embedr` directory.
2. The React UI is built and all required assets (scripts, styles and images) are placed in the Wordpress theme.
3. The React UI for the viewer is built and the required static assets are placed in `build/viewer`.
4. The JavaScript files are minified.

All of this can be executed by running `grunt buildProduction`.

You can run step 1 with the command `grunt buildWordpress`, step 2 with `grunt buildApp`, step 3 with `grunt buildViewer` and the first 3 steps together with `grunt build`.

## Development & watch

By running `grunt watch` the builds are automatically done as you are developing, which means you won't have to do manual builds. The watch command never minifies the build.

## Deployment

Grunt can also do deployments. This relies on your ssh config being setup for a `kennisland` and `kennisland-dev` server. The tasks to run is `grunt rsync` or `grunt rsync:dev` if you want to build to the development environment.

The viewer can also be deployed, but this is dependent on the hawk application, so the build artifacts are more commonly used to merge into that application.

The search proxy needs to be available at `embedr.eu/search` with the Cloudsearch server available in a `config.php` file.
