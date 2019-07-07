module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tests', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING(10),
    },
    image: {
      type: Sequelize.STRING,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('Tests'),
};
