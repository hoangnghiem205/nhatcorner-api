var path = require('path')
  , rootPath = path.normalize(__dirname + '/..')
  , env = process.env.NODE_ENV || 'development'
  , port = 8000
  
var config = {
  development: {
    root: rootPath,
    secret: 'nhatshop',
    app: {
      name: 'nhatshop-api'
    },
    port: port,
    dialect: 'mysql',
    db: 'nhatshop',
    db_port: 8889,
    user: 'root',
    pass: 'root'
  },

  production: {
    root: rootPath,
    secret: 'nhatshop',
    app: {
      name: 'nhatshop-api'
    },
    port: port,
    dialect: 'mysql',
    db: 'nhatshop',
    db_port: 8889,
    user: 'root',
    pass: 'root'
  }
};

module.exports = config[env];