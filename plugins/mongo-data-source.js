'use strict'

const fastifyMongo = require('@fastify/mongodb')

module.exports = fp(async function (fastify, opts) {
    
    fastify.register(fastifyMongo, opts.mongo)
    
})