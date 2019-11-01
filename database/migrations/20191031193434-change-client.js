module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('Clients', 'address', {
    type: Sequelize.STRING(256),
    allowNull: true,
  }),
  down: queryInterface => queryInterface.removeColumn('Clients', 'address'),
};
