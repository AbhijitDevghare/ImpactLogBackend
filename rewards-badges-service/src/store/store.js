// store.js
'use strict';

let store = {
  isRedis: false, // flag to check if Redis is being used
  client: null,   // redis client instance
  memory: new Map() // fallback in-memory store
};

module.exports = store;
