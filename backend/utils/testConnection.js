const { Sequelize } = require("sequelize");

const testConnection = async (hostname, role, password, dbType, database) => {
  try {
    const sequelize = new Sequelize(database, role, password, {
      host: hostname,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
        },
      },
    });

    await sequelize.authenticate();
    console.log("The connection was made successfully");
    await sequelize.close();

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { testConnection };
