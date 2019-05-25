# cc-api [WIP]

[![TypeScript](https://img.shields.io/badge/typescript-%E2%9D%A4%EF%B8%8F-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://travis-ci.org/rnegron/cc-api.svg?branch=master)](https://travis-ci.org/rnegron/cc-api)

A bare-bones homebrew implementation of the Caribbean Cinemas API, being built in TypeScript using web scrapers. An official API exists, this is just a fun exercise. For personal use only.

**Note**: Since the data for this API is being obtained by scraping the web page, it is not expected to be accurate forever. In fact, new data will be unobtainable once the web page changes, at least until the scrapers get updated to compensate. In any case, this is a toy project and should be treated as such.

## To-Do

- General
    - [X] Logging
    - [X] Throttling
    - [X] Versioning
    - [X] JSONAPI Schema Serialization
    - [ ] Documentation
    - [ ] Testing / Coverage
    - [ ] Caching
    - [ ] MongoDB Document Hydration / Task Scheduling
    - [ ] MongoDB Document Cleanup / Document Expiration
    - [ ] Idempotent tasks
    - [ ] TravisCI Deployment
- Routes
    - [X] Movies
    - [X] Theatres
    - [ ] Movie Runs
    