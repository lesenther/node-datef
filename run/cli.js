#!/usr/bin/env node

console.log(JSON.stringify(require('../')(process.argv.slice(2).join(' ')), undefined, 2));