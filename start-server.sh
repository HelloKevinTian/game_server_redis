#!/bin/bash
nohup node app.js &

sleep 3
ps x | grep node

echo '################# game server is running... #############'
