#!/bin/bash

# Change to parent of this script's directory.
cd "$(dirname "${BASH_SOURCE[0]}")"/..

PID_FILE=/var/run/ahns.co.pid

if [ -f "$PID_FILE" ]; then
  kill -9 $(cat "$PID_FILE")
  rm "$PID_FILE"
else
  echo "No PID file found for ahns.co"
fi
