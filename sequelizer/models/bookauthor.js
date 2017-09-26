/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bookauthor', {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    bookId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    authorId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'author',
        key: 'Id'
      }
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
    tableName: 'bookauthor'
  });
};
