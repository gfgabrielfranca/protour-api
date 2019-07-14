module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Services', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    icon: {
      type: Sequelize.STRING,
      unique: true,
    },
    name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('Services'),
};
