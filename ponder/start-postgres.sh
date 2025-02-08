#!/bin/bash

mkdir -p ./.postgres-data

docker run -d \
  --name modularium-indexer-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -v ./.postgres-data/:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:15
