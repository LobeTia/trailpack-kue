'use strict'
/* global describe, it */
const assert = require('assert')

describe('KueService', () => {
  it('should exist', () => {
    assert(global.app.api.services['KueService'])
  })
})
