/**
 * Trailpack Configuration
 *
 * @see {@link http://trailsjs.io/doc/trailpack/config
 */
module.exports = {
  driver: {
    prefix: 'q',
    redis: {
      port: 6379,
      host: '127.0.0.1',
      auth: '',
      db: 1,
      options: {
        // see https://github.com/mranney/node_redis#rediscreateclient
      }
    }
  },

  /**
   * Define tasks profiles.
   * Each task profile can have a concurrency and refer to a class exposed in api.tasks
   */
  jobs: [
    {
      name: 'hello_world',
      concurrency: 10,
      controller: 'HelloWorldTask',
      defaults: {
        priority: 'high',
        attempts: 5,
        backoff: true,
        ttl: 10000,
        delay: 10000
      }
    }
  ],

  webui: {
    active: false,
    port: 8080
  }
}

