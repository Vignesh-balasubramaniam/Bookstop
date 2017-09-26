/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('author', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(36),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'author'
  });
};
