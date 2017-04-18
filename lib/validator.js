const joi = require('joi')
const lib = require('.')

module.exports = {
  validateKueConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, lib.Schemas.kueConfig, (err, value) => {
        if (err) return reject(err)
        return resolve(value)
      })
    })
  },

  validateTask(job){
    return new Promise((resolve, reject) => {
      joi.validate(job, lib.Schemas.job, (err, value) => {
        if (err) return reject(err)
        return resolve(value)
      })
    })
  }
}
