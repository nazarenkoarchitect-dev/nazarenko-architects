#!/bin/bash
cd /var/www/u3452422_default/nazarenko-architects/backend
npm install
pm2 restart server || pm2 start server.js --name nazarenko-backend
