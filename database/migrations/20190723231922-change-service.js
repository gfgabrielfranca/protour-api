module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Services', 'default', {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }),
  down: queryInterface => queryInterface.removeColumn(
    'Vehicles',
    'default',
  ),
};
