#!/bin/bash

cmd="curl -X POST  -H \"Content-Type: application/json\" -d '{\"toWhom\":\"${1}\"}' https://ropsten.faucet.b9lab.com/tap";

echo $cmd;
