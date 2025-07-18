#!/bin/sh
set -e

host="$DB_HOST"
port=3306

echo "Waiting for MySQL at $host:$port..."

while ! nc -z "$host" "$port"; do
  sleep 1
done

echo "MySQL is up - starting backend..."

exec "$@"
