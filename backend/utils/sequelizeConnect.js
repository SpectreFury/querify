const { Sequelize } = require("sequelize");

const sequelizeConnect = async (
  hostname,
  role,
  password,
  dbType,
  databaseName
) => {
  try {
    const sequelize = new Sequelize(databaseName, role, password, {
      host: hostname,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
    });

    await sequelize.authenticate();
    return sequelize;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sequelizeConnect,
};
