module.exports = {
  defaults: {
    driver: {
      prefix: "k",
      redis:  {
        port: 6379,
        host: '127.0.0.1',
        db:   1
      }
    },
    jobs:  [],
    webui:  {
      active: false,
      port:   8080
    }
  }
}
