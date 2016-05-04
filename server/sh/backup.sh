#!/bin/bash

mongodump --db adamheins --out ~/backups/$(date +%F_%s) --collection links
