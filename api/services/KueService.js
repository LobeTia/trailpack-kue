'use strict'

const Service = require('trails/service')
const Kue = require('kue')

/**
 * @module KueService
 * @description TODO document Service
 */
module.exports = class KueService extends Service {
  init() {
    const config = this.app.config.kue

    this.kueInstance = Kue.createQueue(config.driver)
    this.tasks = {}

    const tasks = Object.keys(config.tasks)
    tasks.forEach(task => {
      this.addTask(task, config.tasks[task])
    })
  }

  addTask(name, task) {
    const app = this.app
    const newTask = new this.app.api.tasks[task.controller](app)
    this.kueInstance.process(name, async (data, done) => {
      await newTask.run(data, app)
      done()
    })
  }

  addJob(name, obj) {
    return this.kueInstance.createJob(name, obj)
  }
}
