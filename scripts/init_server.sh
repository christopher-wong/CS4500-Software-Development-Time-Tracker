#!/bin/bash

# Exit if any commands fail.
trap 'exit' ERR

# Echo each command as they are run
set -v

# Add Mongo source
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list

# Update packages
apt-get update -y && apt-get upgrade -y

# Install Nodejs and build-essential
curl -sL https://deb.nodesource.com/setup_8.x | bash -
apt-get install -y nodejs
apt-get install -y build-essential

# Install Mongo
apt-get update
apt-get install -y mongodb-org
service mongod start

# Setup firewall
apt-get install ufw -y
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 8080
ufw enable
ufw status verbose

# Allow Node use of port 80
sh -c 'apt-get install libcap2-bin'
sh -c 'setcap cap_net_bind_service=+ep `readlink -f \`which node\``'

# Install pm2 globally
sh -c 'npm install pm2 -g'
sh -c 'env PATH=$PATH:/usr/local/bin pm2 startup -u administrator'

# Cleanup
apt autoremove

echo 'Setup complete. Please restart the server.'