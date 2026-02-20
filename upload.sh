#!/bin/bash

USER="ubuntu"
SERVER="server ip here"
DIR="folder-name"

echo ">>> Connecting to server & removing deploy dir..."
ssh $USER@$SERVER "rm -rf $DIR" 

echo ">>> Transferring files to new deploy dir..."
scp -r deploy $USER@$SERVER:/home/$USER/$DIR
