module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Vehicles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    photo: {
      type: Sequelize.STRING,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(256),
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    value: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Vehicles'),
};
