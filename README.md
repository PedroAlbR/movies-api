# Movies API

Simple API to create and store movies with comments.

## Requirements

- Docker

## Setup

First, rename or copy the `example.env` file to `.env`.

```sh
cp example.env .env
```

Then, you can run `make start`.

```sh
make start
```

If you want to seed the DB, you just have to run `make seed-db` after everything is up.

```sh
make seed-db
```

## Endpoints

You can check here the [endpoint documentation](./docs/endpoints.md)
