'use strict'

const Trailpack = require('trailpack')
const lib       = require('./lib')
const _         = require('lodash')
const config    = require('./lib/config')

module.exports = class KueTrailpack extends Trailpack {

  constructor(app) {
    super(app, {
      config: require('./config'),
      api: require('./api'),
      pkg: require('./package')
    })
  }

  /**
   * TODO document method
   */
  validate() {
    if (!this.app.config.kue) throw new Error('app.config.kue not found, please check if is correctly loaded in config/index.js or create it')

    this.app.config.kue = _.defaultsDeep(this.app.config.kue, config.defaults)
    return lib.Validator.validateKueConfig(this.app.config.kue)
  }

  /**
   * TODO document method
   */
  configure() {
  }

  /**
   * TODO document method
   */
  initialize() {
    this.app.on('trails:ready', () => {
      this.app.services.KueService.init(this.app)
    })
    return Promise.resolve()
  }

  /**
   * Gracefully shutdown Kue
   * @returns {Promise}
   */
  unload() {
    return new Promise((fullfill, reject) => {
      this.app.log.info('Gracefully shutting down Kue')
      this.app.services.KueService.shutdown((this.app, (error) => {
        if (error) {
          this.app.log.error('Unable to shutdown Kue')
          reject(error)
        }
        else {
          this.app.log.silly('Succesfully shutted down Kue')
          fullfill()
        }
      }))
    })
  }

}

module.exports.Task = lib.Task
