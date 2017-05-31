#!/bin/bash

# Change to parent of this script's directory.
cd "$(dirname "${BASH_SOURCE[0]}")"/..

PID_FILE=/var/run/short.pid

if [ -f "$PID_FILE" ]; then
  kill -9 $(cat "$PID_FILE")
  rm "$PID_FILE"
else
  echo "No PID file found for short."
fi
