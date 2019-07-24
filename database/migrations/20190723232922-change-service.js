module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('Services', 'quantity', {
    type: Sequelize.INTEGER,
    allowNull: true,
  }),
  down: (queryInterface, Sequelize) => queryInterface.changeColumn('Vehicles', 'quantity', {
    type: Sequelize.INTEGER,
    allowNull: false,
  }),
};
