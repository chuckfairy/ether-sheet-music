/**
 * Account lister
 */
"use strict";

var Contract = require( "../src/Contract.js" );

var web = Contract.getWeb();

console.log( web.eth.accounts );
