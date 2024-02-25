'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastify = require('fastify')

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {

  fastify.log.info('The .env file has been read %s', process.env.MONGO_URL)

  // Place here your custom code!

  await fastify.register(require('./configs/config'))

  fastify.log.info('Config loaded %o', fastify.config)

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    dirNameRoutePrefix: false,
    ignorePattern: /.*.no-load\.js/,
    indexPattern: /^no$/i,
    options: fastify.config
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    indexPattern: /.*routes(\.js|\.cjs)$/i,
    ignorePattern: /.*\.js/,
    autoHooksPattern: /.*hooks(\.js|\.cjs)$/i,
    autoHooks: true,
    cascadeHooks: true,
 //   options: Object.assign({}, opts)
  })

  // Load the schemas
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'schemas'),
    indexPattern: /^loader.js$/i
  })

}

module.exports.options = module.exports.options = {
  ajv: {
    customOptions: {
      removeAdditional: 'all'
    }
  },
  logger: {
    level: 'info'
  },
}
