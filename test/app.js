'use strict'

const _            = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: require('../package').name + '-test'
  },
  api: {
    models: {},
    controllers: {},
    services: {}
  },
  config: {
    kue:{

    },
    main: {
      packs: [
        require('../')
      ]
    }
  }
}, smokesignals.FailsafeConfig)


