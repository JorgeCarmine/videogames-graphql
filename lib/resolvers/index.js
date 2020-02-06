'use strict'

const queries = require('./queries');
const mutators = require('./mutators');
const types = require('./types');

module.exports = {
    Query: queries,
    Mutation: mutators,
    ... types
}