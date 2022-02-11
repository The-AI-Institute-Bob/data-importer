const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('origins', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    lang: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "en"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'origins',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "origins_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
