# Ether Sheet Music Project


# Install

- `npm install`
- `./bin/build.js` Build contract
- `./bin/startup.sh` startup node web server


# Config

- basic config for default values in `./config/config.json`


## Eth Private Network

Install the GUI app http://truffleframework.com/ganache/. When the app is started...

- Settings > Server > Port Number. Set this to `8545` or whatever you have set in the `config.json`. You'll only need to do this once.
- Make sure you are automining
- Within the app it's going to give you a number of accounts with tons of ETH. Import one of these into metamask via the private key.
- If you ever restart Ganache. Under settings in metamask. Click `Reset Account`. Nothing will work without this.


## Building Contract

- `./bin/build.js`. Contract address will be outputed. View ganache block explorer to ensure it happened.


## Running Web Server

- `./bin/startup.sh` or `node ./src/App.js`.
- http://localhost:9090 will be default on `config.json`
- As it will stated in design. If you change the server `/templates/` rerun the server.


## MetaMask

- change your node to `http://localhost:8545`.
- There is bug within metamask. If you change your node, you will need restart the browser or you will not receive websocket events from 8545.


# Design

- `/templates/` these are pre built from `./src/App.js`. `main.html` is the index. It's needed to load the current contract address. See scripts in `main.html` for the reasoning. If you have changed one of these templates, rerun the server to see changes.
- `/web/templates/` frontend templates
- To get a notes in design run `node ./utils/create-note.js` or `node ./utils/create-mass-notes.js`


# Testing

Run

- `npm install -g mocha`
- `mocha`


# Links

- https://github.com/paulrosen/abcjs


# TODO

- Midi download fix, problem exists in abcjs


## Maybes

- Composer name add. might need external DB, but really don't want to do that
