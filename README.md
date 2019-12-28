# cc-api

[![TypeScript](https://img.shields.io/badge/typescript-%E2%9D%A4%EF%B8%8F-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://travis-ci.org/rnegron/cc-api.svg?branch=master)](https://travis-ci.org/rnegron/cc-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/42eab3fd8ea68603786f/maintainability)](https://codeclimate.com/github/rnegron/cc-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/42eab3fd8ea68603786f/test_coverage)](https://codeclimate.com/github/rnegron/cc-api/test_coverage)

A bare-bones homebrew implementation of the Caribbean Cinemas API, being built in TypeScript using web scrapers. An official API exists, this is just a fun exercise. For personal use only.

**Note**: Since the data for this API is being obtained by scraping the web page, it is not expected to be accurate forever. In fact, new data will be unobtainable once the web page changes, at least until the scrapers get updated to compensate. In any case, this is a toy project and should be treated as such.


## How To

### Run the API

`yarn serve`

### Scrape theatres and update database

`yarn tasks get-movie-theatres --persist`

### Scrape _Now Showing_ Movies

`yarn tasks get-now-showing`

### Scrape _Coming Soon_ Movies and update database

`yarn tasks get-coming-soon --persist`


### Add all movie runs for all theatres

`yarn tasks add-movie-runs --persist`

## To-Do

- General
    - [X] Logging
    - [X] Throttling
    - [X] Versioning
    - [X] JSONAPI Schema Serialization
    - [X] Documentation
    - [ ] Server side caching
    - [X] MongoDB Document Hydration / Task Scheduling
    - [X] MongoDB Document Cleanup / Document Expiration
    - [ ] Pagination
    - [ ] 100% Test Coverage
    - [X] TravisCI Deployment
