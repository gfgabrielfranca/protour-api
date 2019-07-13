module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'name cannot be null',
        },
        notEmpty: {
          msg: 'name can not be empty',
        },
        len: {
          args: [0, 256],
          msg: 'name can not be longer than 256 characters',
        },
      },
    },
    photo: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  Car.file = {
    field: 'photo',
    validate: {
      required: true,
      maxSize: 1,
      extensions: ['jpeg', 'jpg', 'png'],
    },
  };

  Car.beforeCreate((car) => {
    const parsedCar = car;

    delete parsedCar.dataValues.id;
    delete parsedCar.dataValues.photo;

    return parsedCar;
  });

  return Car;
};
