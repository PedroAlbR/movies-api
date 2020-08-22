require('ts-node/register');

module.exports = {
  client: 'mysql',
  connection: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  migrations: {
    tableName: 'knex_migrations',
    directory: __dirname + '/db/migrations',
  },
  seeds: {
    directory: __dirname + '/db/seeds',
  },
};
