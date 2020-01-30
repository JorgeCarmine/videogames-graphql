'use strict'

require('dotenv').config()

// const { buildSchema } = require('graphql')
const { makeExecutableSchema } = require('graphql-tools')
const chalk = require('chalk')
const express = require('express')
const graphqlMiddleware = require('express-graphql')
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers/index');

const app = express()
const port = process.env.PORT

// Old Schema
// const schema = buildSchema(
//     readFileSync(
//         join(__dirname, 'lib', 'schema.graphql'),
//         'utf-8'
//     )
// )

// graphql(schema, '{ hello, name }', resolvers)
// .then(data => {
//     console.log(data);
// })

// Schema
const typeDefs = readFileSync(
    join(__dirname, 'lib', 'schema.graphql'),
    'utf-8'
)

const schema = makeExecutableSchema({ typeDefs, resolvers })


app.use('/api', graphqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`${chalk.green('[Server listening]')} on port  ${process.env.SITE_DOMAIN}:${port}/api`)
})
