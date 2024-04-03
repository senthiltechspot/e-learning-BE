export const dbConfig = {
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres",
    ENDPOINT_ID: process.env.ENDPOINT_ID,
  },
  test: {},
  production: {},
};
