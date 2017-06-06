'use strict'

const Service = require('trails/service')
const Kue     = require('kue')

/**
 * @module KueService
 * @description TODO document Service
 */
module.exports = class KueService extends Service {
  init() {
    this.app.kue = Kue.createQueue(this.app.config.kue.driver)
    this.jobs    = {}

    this.app.config.kue.jobs.forEach(job => {
      this.addJob(job.name, job)
    })
  }

  addJob(name, job, app) {
    this.jobs[name] = job

    const taskHandler = new this.app.api.jobs[job.controller](this.app)
    this.kueInstance.process(name, (data, done) => {
      taskHandler.run(data, done, this.app)
    })
  }

  createJob(name, obj) {
    const jobInstance = this.kueInstance.createJob(name, obj)
    return jobInstance
  }

  shutdown(fn) {
    this.app.kue.shutdown(5000, fn)
  }

}
