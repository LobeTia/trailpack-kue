'use strict'
const joi = require('joi')

module.exports = {
  kueConfig: joi.object().required().keys({
    driver: joi.object().required().keys({
      prefix: joi.string().required(),
      redis: joi.object().required()
    }),
    jobs: joi.array().required(),
    webui: joi.object().keys({
      active: joi.boolean().required(),
      port: joi.number().integer().min(0).max(99999).required()
    })
  }),

  job: joi.object().keys({
    name: joi.string().required(),
    concurrency: joi.number().integer().min(1).max(9999).required(),
    controller: joi.string().required(),
    defaults: joi.object().keys({
      priority: joi.any(),
      attempts: joi.number().integer().min(0),
      backoff: joi.boolean(),
      ttl: joi.number().integer(),
      delay: joi.number().integer()
    })
  })
}
