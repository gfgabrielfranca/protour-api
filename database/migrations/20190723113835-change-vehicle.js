module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Vehicles', 'quantity', {
    type: Sequelize.INTEGER,
    allowNull: false,
  }),
  down: queryInterface => queryInterface.removeColumn(
    'Vehicles',
    'quantity',
  ),
};
