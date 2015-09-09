#!/bin/bash
kill $(ps x|grep -E 'node'|grep -v grep|awk '{print $1}')
sleep 3
ps x | grep node
echo '@@@@@@@@@@@@@@@@@ game server stop ok @@@@@@@@@@@@@@@@'
