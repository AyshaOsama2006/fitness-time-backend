module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.Trainer, {
        foreignKey: 'trainerId',
        as: 'trainer'
      });
    }
  }

  Booking.init({
    userId: DataTypes.INTEGER,
    trainerId: DataTypes.INTEGER,
    bookingDate: DataTypes.DATE,
    bookingTime: DataTypes.TIME,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings',
    timestamps: true
  });

  return Booking;
};