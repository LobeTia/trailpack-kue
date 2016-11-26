'use strict';

const Service = require('trails-service');
const Kue     = require("kue");

/**
 * @module KueService
 * @description TODO document Service
 */
module.exports = class KueService extends Service {
    init() {
        const config = this.app.config.kue;

        this.kueInstance = Kue.createQueue();
        this.tasks       = {}

        const tasks = Object.keys(config.tasks)
        tasks.forEach(task => {
            this.addTask(task, config.tasks[task])
        })
    }

    addTask(name, task) {
        let _task = new this.app.api.tasks[task.controller]
        this.kueInstance.process(name, _task.run)
    }

    addJob(name, obj){
        return this.kueInstance.createJob(name, obj)
    }
};
