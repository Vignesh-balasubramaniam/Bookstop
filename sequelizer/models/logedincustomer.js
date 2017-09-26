/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logedincustomer', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    customerid: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'logedincustomer'
  });
};
