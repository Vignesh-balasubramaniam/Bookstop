/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    isbn: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    publication: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER(4),
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
    tableName: 'books'
  });
};
