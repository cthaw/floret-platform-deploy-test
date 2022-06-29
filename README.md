# Floret Platform

Main platform application for Floret.

## Table of contents

- [Floret Platform](#floret-platform)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
    - [Dependencies](#dependencies)
    - [Database](#database)
    - [Project Installation](#project-installation)
  - [Usage](#usage)
    - [Running Dev Server](#running-dev-server)
    - [Building the App](#building-the-app)
    - [Running the Build](#running-the-build)
    - [Running Test](#running-test)
    - [Building the Container](#building-the-container)
    - [Run Container Locally](#run-container-locally)
  - [Testing](#testing)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation


### Dependencies

This project requires NodeJS to run. The preferred way to install is with [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

This project uses Node version 16.15.0 (LTS as of 05/03)

### Database

A database is required to run locally at localhost:27017 unless otherwise specified in your env. You can set up a local database by following [these instructions](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)

### Project Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/floret-dev/floret-platform.git
$ cd floret-platform
```

To install the required dependencies, run:

```sh
$ npm run install
```

## Usage

### Running Dev Server

```sh
$ npm run dev
```

### Building the App

```sh
$ npm run build
```

### Running the Build

```sh
$ npm start
```

### Running Test

```sh
$ npm run test
```

### Building the Container

```
$ docker build -t <image_name> .
```

### Run Container Locally

```
$ docker run -d -p <host_port>:<container_port> <image_name>
```
NOTE: The container port is 8080 by default

## Testing

The testing directory structure should match the source directory structure. For example files in `/server/src/routes/api/deductions/` should have their corresponding tests in `/server/test/routes/api/deductions/`. 

Test file names should be of the format _*.test.ts_.
