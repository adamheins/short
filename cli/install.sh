#!/bin/sh

# Check for conflict.
if [ -f /usr/local/bin/short ]; then
  echo "A program called 'short' already exits in /usr/local/bin. Exiting."
  exit 1
fi

cp short.py /usr/local/bin/short
