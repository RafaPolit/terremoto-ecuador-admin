# Terremoto Ecuador Admin
Admin site for www.terremotoecuador.com

For production:

Install NodeJS
```
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ npm install npm@3 -g
```
Install Forever
```
$ npm install forever -g
```

Deploy the package (creating the dist on client and with all node_modules form server, instructions comming soon!).

Then cd into the server directory and run:
```
$ export NODE_ENV=production
$ forever -a -o /tmp/terremotoecuador_admin.log start ./bin/www
```

