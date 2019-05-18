# cc-api [WIP]

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A bare-bones homebrew implementation of the Caribbean Cinemas API, being built in TypeScript using web scrapers. An official API exists, this is just a fun exercise. For personal use only.

**Note**: Since the data for this API is being obtained by scraping the web page, it is not expected to be accurate forever. In fact, the data will be unobtainable once the web page changes, at least until the scrapers get updated to compensate. In any case, this is a toy project and should be treated as such.

## To-Do

- General
    - [X] Logging
    - [X] Throttling
    - [X] Versioning
    - [ ] JSONAPI Schema Serialization
    - [ ] Documentation
    - [ ] Testing / Coverage
    - [ ] Caching
    - [ ] MongoDB Document Hydration / Task Scheduling
    - [ ] MongoDB Document Cleanup / Document Expiration
    - [ ] Idempotent tasks
    - [ ] TravisCI Deployment
- Routes
    - [ ] Movies
    - [ ] Movie Runs
    