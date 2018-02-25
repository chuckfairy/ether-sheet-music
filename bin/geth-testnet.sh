#!/bin/bash

geth --testnet --rpc --rpcapi "net,eth,personal,admin,web3,db" --rpcport 8545 --verbosity 6
