module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      IP: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artistName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );

  return User;
};
