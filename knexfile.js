// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'topspinjs',
      user:     'topspinjs',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'topspinjs',
      user:     'topspinjs',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './migrations'
    }
  }

};
