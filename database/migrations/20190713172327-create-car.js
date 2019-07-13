module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Cars', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING(256),
      allowNull: false,
    },
    photo: {
      type: Sequelize.STRING(256),
      unique: true,
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
  down: queryInterface => queryInterface.dropTable('Cars'),
};
