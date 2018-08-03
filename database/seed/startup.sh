#!/bin/bash

cd "/docker-entrypoint-initdb.d";

MONGOCMD="mongoimport -d '${MONGO_INITDB_DATABASE}'"

ls -1 *.json | sed 's/.json$//' | while read col; do
    eval "${MONGOCMD} --drop -c $col < $col.json;"
done
