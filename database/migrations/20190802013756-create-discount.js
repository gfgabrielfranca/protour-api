module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Discounts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    days: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    percent: {
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('Discounts'),
};
