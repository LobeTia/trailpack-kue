# trailpack-kue
📦 Easily set up background workers with [Kue](https://github.com/Automattic/kue) and [Trails](http://trailsjs.io)
This project is built on top of the [Kue](https://github.com/Automattic/kue) library

## WARNING still work in progress, things can break

## Install

```sh
$ npm install --save trailpack-kue
or
yo trails:trailpack trailpack-kue
```

## Configure

### Add Trailpack
```js
// config/main.js
module.exports = {
  packs: [
    // ... other trailpacks
    require('trailpack-kue')
  ]
}
```

### Configure Task Settings

```js
// config/kue.js
module.exports = {
 driver: {
    prefix: 'q',
    redis:  {
      port:    6379,
      host:    '127.0.0.1',
      auth:    'password',
      db:      1, // if provided select a non-default redis db
      options: {
        // see https://github.com/mranney/node_redis#rediscreateclient
      }
    }
  },
  /**
   * Define tasks profiles.
   * Each task profile can have a concurrency and refer to a class exposed in api.tasks
   */
  tasks: {
    hello_world: {
      concurrency: 1,
      controller:  "HelloWorldTask"
    }
  },
  webui: {
    active: false,
    port:   8080
  }
}
```

### Include tasks in the app object
Create a directory `api/tasks`.  Any task definitions will be created as classes in this directory.
Create  `api/tasks/index.js` to export all of the tasks.
Include this directory in `api/index.js`.  Here is an example:

```js
// api/index.js

exports.controllers = require('./controllers')
exports.models = require('./models')
exports.policies = require('./policies')
exports.services = require('./services')
exports.tasks = require('./tasks')
```

## Usage

Define tasks in `api.tasks`.  Tasks are run by kue.

```js
// api/tasks/HelloWorldTask.js

const Task = require("trailpack-kue").Task

module.exports = class HelloWorldTask extends Task {
  contructor(app){
      super(app)
  }
    
  run(job, done, app) {
    console.log("Hello ", job.data.name);
    done();
  }
}
```


To start a job, create a job object via `app.services.KueService.addJob` interface and save it:
Job can be set with all Kue Job options

```
let job = app.services.KueService.addJob("hello_world",{name:"Jon Doe"})
job.priority("high")
job.save()
```
