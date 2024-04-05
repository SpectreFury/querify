const { Sequelize } = require("sequelize");

const sequelizeConnect = async (hostname) => {
  try {
    const sequelize = new Sequelize(hostname);

    await sequelize.authenticate();
    return sequelize;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sequelizeConnect,
};
