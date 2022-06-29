const config = {
  mongodb: {
    url: process.env.DATA_MIGRATION_URL,

    databaseName: process.env.DATABASE_NAME,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },

  migrationsDir: "migrations",

  changelogCollectionName: "changelog",

  migrationFileExtension: ".js",

  useFileHash: false,

  moduleSystem: "commonjs",
};

module.exports = config;
