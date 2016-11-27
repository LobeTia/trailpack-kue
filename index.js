'use strict';

const Trailpack = require('trailpack');
const lib       = require("./lib");

module.exports = class KueTrailpack extends Trailpack {

  /**
   * TODO document method
   */
  validate() {
    if (!this.app.config.kue) throw new Error("config.kue not defined")
    if (!this.app.config.kue.tasks) throw new Error("config.kue.tasks not defined")
    if (!this.app.config.kue.webui) throw new Error("config.kue.webui not defined")
    if (!this.app.config.kue.driver) throw new Error("config.kue.driver not defined")
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
    this.app.on("trails:ready", () => {
      this.app.services.KueService.init();
    })
    return Promise.resolve();
  }

  constructor(app) {
    super(app, {
      config: require('./config'),
      api:    require('./api'),
      pkg:    require('./package')
    })
  }
}

module.exports.Task = lib.Task
