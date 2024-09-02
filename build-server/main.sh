#!/bin/bash

export GIT_RESPOSITRY_URL="$GIT_RESPOSITRY_URL"
git clone "$GIT_RESPOSITRY_URL" /home/app/output
exec node ./script.js